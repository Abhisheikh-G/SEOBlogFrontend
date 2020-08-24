import AdminLayout from "../../../components/Auth/AdminLayout";
import { useModal } from "../../../actions/hooks";
import {
  Grid,
  Box,
  Toolbar,
  Button,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import CreateBlog from "../../../components/CRUD/CreateBlog";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { listAllBlogs, removeBlog, getBlog } from "../../../actions/blog";
import { getCookie, isAuth } from "../../../actions/auth";
import { useEffect, useReducer } from "react";
import UpdateBlog from "../../../components/CRUD/UpdateBlog";

const initialState = {
  allBlogs: [],
  blog: {},
  message: "",
  error: false,
  success: false,
  reload: false,
};

const blogActions = {
  CLEAR_MESSAGE: "CLEAR_MESSAGE",
  REFRESH: "REFRESH",
  SET_BLOG_TO_UPDATE: "SET_BLOG_TO_UPDATE",
  RETRIEVE_ALL_BLOGS: "RETRIEVE_ALL_BLOGS",
  REMOVE_BLOG_SUCCESS: "REMOVE_BLOG_SUCCESS",
  REMOVE_BLOG_FAILURE: "REMOVE_BLOG_FAILURE",
};

function blogReducer(state, action) {
  switch (action.type) {
    case blogActions.CLEAR_MESSAGE:
      return {
        ...state,
        ...state.allBlogs,
        ...initialState,
      };
    case blogActions.SET_BLOG_TO_UPDATE:
      return {
        ...state,
        blog: action.payload,
      };
    case blogActions.REFRESH:
      return {
        ...state,
        reload: !state.reload,
      };
    case blogActions.RETRIEVE_ALL_BLOGS:
      return {
        ...state,
        allBlogs: action.payload,
      };
    case blogActions.REMOVE_BLOG_SUCCESS:
      return {
        ...state,
        success: true,
        error: false,
        message: "Successfully deleted blog.",
      };
    case blogActions.REMOVE_BLOG_FAILURE:
      return { ...state, success: false, error: true, message: action.payload };
    default:
      return { ...state };
  }
}

export default function AdminManageBlog() {
  const router = useRouter();
  const [state, dispatch] = useReducer(blogReducer, initialState);
  const { allBlogs, success, reload, blog } = state;
  const createBlogModal = useModal();
  const updateBlogModal = useModal();
  const token = getCookie("token");

  useEffect(() => {
    handleSetAllBlogs();
  }, []);

  useEffect(() => {
    handleSetAllBlogs();
  }, [success, reload]);

  const handleRefresh = () => {
    dispatch({ type: blogActions.REFRESH });
  };

  const handleUpdateBlog = (slug) => {
    getBlog(slug).then((data) => {
      if (data.error) console.log(data.error);
      else {
        dispatch({ type: blogActions.SET_BLOG_TO_UPDATE, payload: data });
        updateBlogModal.handleClickOpen();
      }
    });
  };

  const handleSetAllBlogs = () => {
    listAllBlogs().then((data) => {
      if (data.error)
        dispatch({ type: blogActions.RETRIEVE_ALL_BLOGS, payload: [] });
      else {
        dispatch({ type: blogActions.RETRIEVE_ALL_BLOGS, payload: data });
      }
    });
  };

  const handleDeleteBlog = (slug) => {
    let answer = window.confirm(
      `Are you sure you want to delete the blog titled "${slug}"?`
    );
    if (answer)
      removeBlog(slug, token).then((data) => {
        if (data.error)
          dispatch({
            type: blogActions.REMOVE_BLOG_FAILURE,
            payload: data.error,
          });
        else {
          dispatch({ type: blogActions.REMOVE_BLOG_SUCCESS });
        }
      });
  };

  const showSuccess = () =>
    state.success && (
      <Alert
        severity="success"
        role="alert"
        component={Box}
        mb={2}
        onClose={() => dispatch({ type: "CLEAR_MESSAGE" })}
      >
        {state.message}
      </Alert>
    );

  const showError = () =>
    state.error && (
      <Alert
        severity="error"
        role="alert"
        component={Box}
        mb={2}
        onClose={() => dispatch({ type: "CLEAR_MESSAGE" })}
      >
        {state.message}
      </Alert>
    );

  const layout = (
    <React.Fragment>
      {showSuccess()}
      {showError()}
      <Container>
        <Grid container spacing={4}>
          <Grid item md={12}>
            <Typography variant="h5">Manage Blogs</Typography>
            <Box
              component={Toolbar}
              display="flex"
              justifyContent="space-around"
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={createBlogModal.handleClickOpen}
                disableRipple
              >
                Create New Blog
              </Button>

              <Button variant="outlined" onClick={handleRefresh}>
                Refresh
              </Button>
            </Box>
            <Box mb={1} />
            <CreateBlog
              open={createBlogModal.open}
              handleClose={createBlogModal.handleClose}
            />
            {updateBlogModal.open && (
              <UpdateBlog
                open={updateBlogModal.open}
                handleClose={updateBlogModal.handleClose}
                blog={blog}
              />
            )}

            <Container maxWidth="lg">
              <List dense={true}>
                {allBlogs.map((blog, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={`${blog.title}`}
                        secondary={`By ${blog.author.name}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => {
                            handleDeleteBlog(blog.slug);
                            handleSetAllBlogs();
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => handleUpdateBlog(blog.slug)}>
                          <UpdateIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );

  return <AdminLayout headerMessage={"Manage Blogs"}>{layout}</AdminLayout>;
}
