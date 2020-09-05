import { useReducer, useEffect } from "react";
import { getCookie } from "../../actions/auth";
import { updateBlog } from "../../actions/blog";
import { getCategories, create } from "../../actions/category";
import { getTags } from "../../actions/tag";

import CustomButton from "../CustomButton/CustomButton";
import {
  Box,
  TextField,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
  makeStyles,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
  FormControlLabel,
  InputBase,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { API } from "../../config";

const useStyles = makeStyles((theme) => {
  paperWidthSm: {
    maxWidth: "auto";
  }
});

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const initialState = {
  title: "",
  body: "",
  formData: {},
  photo: "",
  categories: [],
  selectedCategories: [],
  tags: [],
  selectedTags: [],
  hidePublishButton: false,
  error: false,
  sizeError: false,
  success: false,
  removed: false,
  reload: false,
  message: "",
};

const blogActions = {
  ADD_FIELD: "ADD_FIELD",
  CLEAR_FORM: "CLEAR_FORM",
  CLEAR_MESSAGE: "CLEAR_MESSAGE",
  CREATE_FORM_DATA: "CREATE_FORM_DATA",
  SET_ALL_FIELDS: "SET_ALL_FIELDS",
  RETRIEVE_STORED_FORM_DATA: "RETRIEVE_STORED_FORM_DATA",
  GET_TAGS_SUCCESS: "GET_TAGS_SUCCESS",
  GET_TAGS_FAILURE: "GET_TAGS_FAILURE",
  ADD_TAG_TO_BLOG: "ADD_TAG_TO_BLOG",
  GET_CATEGORIES_SUCCESS: "GET_CATEGORIES_SUCCESS",
  GET_CATEGORIES_FAILURE: "GET_CATEGORIES_FAILURE",
  ADD_CATEGORY_TO_BLOG: "ADD_CATEGORY_TO_BLOG",
  UPDATE_BLOG_SUCCESS: "UPDATE_BLOG_SUCCESS",
  UPDATE_BLOG_FAILURE: "UPDATE_BLOG_FAILURE",
};

function reducer(state, action) {
  switch (action.type) {
    case blogActions.CLEAR_MESSAGE:
      return { ...state, message: "", success: false, error: false };
    case blogActions.CLEAR_FORM:
      return {
        ...state,
        title: "",
        body: "",
        photo: "",
        selectedCategories: [],
        selectedTags: [],
      };
    case blogActions.ADD_FIELD:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case blogActions.SET_ALL_FIELDS:
      return {
        ...state,
        title: action.payload.title,
        body: action.payload.body,

        selectedCategories: action.payload.categories.map(
          (category) => category._id
        ),
        selectedTags: action.payload.tags
          ? action.payload.tags.map((tag) => tag._id)
          : [],
      };
    case blogActions.CREATE_FORM_DATA:
      return {
        ...state,
        formData: new FormData(),
      };
    case blogActions.RETRIEVE_STORED_FORM_DATA:
      return {
        ...state,
        title: action.payload.retrievedTitle,
        body: action.payload.retrievedBody,
      };
    case blogActions.SET_BODY:
      return {
        ...state,
        body: action.payload,
      };
    case blogActions.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        success: false,
        error: true,
        message: action.payload,
      };
    case blogActions.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        error: false,
        categories: action.payload,
        reload: state.reload,
      };
    case blogActions.ADD_CATEGORY_TO_BLOG:
      return {
        ...state,
        selectedCategories: action.payload,
      };
    case blogActions.GET_TAGS_FAILURE:
      return {
        ...state,
        success: false,
        error: true,
        message: action.payload,
      };
    case blogActions.GET_TAGS_SUCCESS:
      return {
        ...state,
        error: false,
        tags: action.payload,
        reload: state.reload,
      };
    case blogActions.ADD_TAG_TO_BLOG:
      return {
        ...state,
        selectedTags: action.payload,
      };
    case blogActions.UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        success: true,
        error: false,
        message: action.payload,
      };
    case blogActions.UPDATE_BLOG_FAILURE:
      return {
        ...state,
        success: false,
        error: true,
        message: action.payload,
      };
    default:
      throw new Error();
  }
}

export default function UpdateBlog({ handleClose, open, blog }) {
  const classes = useStyles();

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    title,
    body,
    formData,
    tags,
    categories,
    selectedCategories,
    selectedTags,
  } = state;
  const token = getCookie("token");
  const router = useRouter();

  useEffect(() => {
    dispatch({ type: blogActions.CREATE_FORM_DATA });
    const retrievedTitle =
      window &&
      localStorage.getItem("title") &&
      JSON.parse(localStorage.getItem("title"));

    const retrievedBody =
      window &&
      localStorage.getItem("blog") &&
      JSON.parse(localStorage.getItem("blog"));

    dispatch({
      type: blogActions.RETRIEVE_STORED_FORM_DATA,
      payload: { retrievedTitle, retrievedBody },
    });

    dispatch({
      type: blogActions.SET_ALL_FIELDS,
      payload: { ...blog },
    });
    initCategories();
    initTags();
  }, []);

  useEffect(() => {}, [router]);

  const handleAddCategory = (e) => {
    dispatch({
      type: blogActions.ADD_CATEGORY_TO_BLOG,
      payload: e.target.value,
    });
    formData.set("categories", e.target.value);
  };

  const showCategories = () =>
    categories && (
      <FormControl fullWidth>
        <InputLabel id="categories-select">Add Categories</InputLabel>
        <Select
          id="categories-select"
          value={selectedCategories}
          onChange={handleAddCategory}
          input={<Input />}
          multiple
        >
          {categories.map((category, index) => (
            <MenuItem key={`${category.name} ${index}`} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );

  const initCategories = async () => {
    const response = await getCategories();
    const data = await Promise.resolve(response);
    !!data.error
      ? dispatch({
          type: blogActions.GET_CATEGORIES_FAILURE,
        })
      : dispatch({
          type: blogActions.GET_CATEGORIES_SUCCESS,
          payload: data,
        });
  };

  const handleAddTag = (e) => {
    dispatch({
      type: blogActions.ADD_TAG_TO_BLOG,
      payload: e.target.value,
    });
    formData.set("tags", e.target.value);
  };

  const showTags = () =>
    tags && (
      <FormControl fullWidth>
        <InputLabel id="tag-select">Add Tags</InputLabel>
        <Select
          id="tag-select"
          value={selectedTags}
          onChange={handleAddTag}
          input={<Input />}
          multiple
        >
          {tags.map((tag, index) => (
            <MenuItem key={`${tag.name} ${index}`} value={tag._id}>
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );

  const initTags = async () => {
    const response = await getTags();
    const data = await Promise.resolve(response);
    !!data.error
      ? dispatch({
          type: blogActions.GET_TAGS_FAILURE,
        })
      : dispatch({
          type: blogActions.GET_TAGS_SUCCESS,
          payload: data,
        });
  };

  const addPhoto = () => (
    <>
      <label>
        Add Featured Photo
        <Box
          component="input"
          name="photo"
          onChange={handleChangeField}
          type="file"
          accept="image/*"
        />
      </label>
    </>
  );

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    updateBlog(formData, token, blog.slug).then((data) => {
      if (!!data.error)
        dispatch({
          type: blogActions.UPDATE_BLOG_FAILURE,
          payload: "There was an error updating the blog.",
        });
      else {
        dispatch({
          type: blogActions.UPDATE_BLOG_SUCCESS,
          payload: "Blog successfully updated.",
        });
        dispatch({ type: blogActions.CLEAR_FORM });
      }
    });
  };

  const handleChangeField = (e) => {
    const name = e.target.name;
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    !!window && localStorage.setItem(name, JSON.stringify(value));
    formData.set([name], value);
    dispatch({ type: blogActions.ADD_FIELD, payload: { name, value } });
  };

  const handleBody = (e) => {
    !!window && localStorage.setItem("blog", JSON.stringify(body));
    formData.set("body", e);
    dispatch({ type: blogActions.SET_BODY, payload: e });
  };

  function newBlogForm() {
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          maxWidth="lg"
        >
          <DialogTitle id="form-dialog-title">Update Blog:</DialogTitle>
          <Box
            component={"form"}
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            p={4}
            mb={1}
            onSubmit={handleUpdateBlog}
          >
            <DialogContent>
              <Container>
                {showSuccess()}
                {showError()}
                <TextField
                  id="title"
                  name="title"
                  label="Blog Title"
                  value={state.title}
                  required={true}
                  fullWidth={true}
                  onChange={handleChangeField}
                />
                <Box my={2} display="flex" justifyContent="space-between">
                  <Box width="50%">{showCategories()}</Box>
                  <Box width="20%">{showTags()}</Box>
                  <Box width="20%">{addPhoto()} </Box>
                </Box>
                <Box mt={2}>
                  <ReactQuill
                    onChange={handleBody}
                    modules={UpdateBlog.modules}
                    formats={UpdateBlog.formats}
                    placeholder="Write something amazing!"
                    value={body}
                  />
                </Box>
                <Box pt={2} display="flex" justifyContent="center">
                  <CustomButton text="Update Blog" type="submit" />
                </Box>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </React.Fragment>
    );
  }

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

  return <React.Fragment>{newBlogForm()}</React.Fragment>;
}

UpdateBlog.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

UpdateBlog.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];
