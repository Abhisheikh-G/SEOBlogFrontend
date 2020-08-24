import Head from "next/head";
import Link from "../../src/Link";
import { useState, useReducer, useEffect } from "react";
import renderHTML from "react-render-html";
import moment from "moment";
import { listAllBlogsInfo } from "../../actions/blog";
import { API, DOMAIN, APP_NAME } from "../../config";
import BlogCard from "../../components/BlogCard";
import {
  Container,
  Box,
  Typography,
  Button,
  Toolbar,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minHeight: "100vh",
  },
}));

const initialState = {
  limit: 0,
  skip: 5,
  size: 0,
  loadedBlogs: [],
};

const blogActions = {
  UPDATE_LIMIT: "UPDATE_LIMIT",
  UPDATE_SKIP: "UPDATE_SKIP",
  UPDATE_SIZE: "UPDATE_SIZE",
  SET_LOADED_BLOGS: "SET_LOADED_BLOGS",
};

function blogReducer(state, action) {
  switch (action.type) {
    case blogActions.UPDATE_LIMIT:
      return { ...state, limit: action.payload };
    case blogActions.UPDATE_SKIP:
      return { ...state, skip: action.payload };
    case blogActions.UPDATE_SIZE:
      return { ...state, size: action.payload };
    case blogActions.SET_LOADED_BLOGS:
      return {
        ...state,
        loadedBlogs: [...state.loadedBlogs, ...action.payload],
      };
    default:
      return { ...state };
  }
}

export default function Blogs({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogsSkip,
  blogsLimit,
}) {
  const classes = useStyles();
  const router = useRouter();
  const [state, dispatch] = useReducer(blogReducer, initialState);
  const { skip, size, limit, loadedBlogs } = state;

  useEffect(() => {
    dispatch({ type: blogActions.UPDATE_LIMIT, payload: blogsLimit });
    dispatch({ type: blogActions.UPDATE_SKIP, payload: blogsSkip });
    dispatch({ type: blogActions.UPDATE_SIZE, payload: totalBlogs });
    dispatch({ type: blogActions.SET_LOADED_BLOGS, payload: blogs });
  }, []);

  const head = (
    <Head>
      <title>Programming blogs | {APP_NAME}</title>
      <meta
        name="description"
        content="Programming blogs and tutorials on React.js, Node.js, Next.js, and other web development topics."
      />
      <meta
        property="og:title"
        content={`Latest web development tutorials | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Programming blogs and tutorials on React.js, Node.js, Next.js, and other web development topics."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta property="og:image" content={`${DOMAIN}/bg.jpg`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/bg.jpg`} />
      <meta property="og:image:type" content="image/type" />

      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
    </Head>
  );

  const showAllBlogs = () => {
    return loadedBlogs.map((blog, index) => (
      <BlogCard isRelated={false} blog={blog} />
    ));
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    listAllBlogsInfo(toSkip, limit).then((data) => {
      if (data.error) console.log(data.error);
      else {
        dispatch({ type: blogActions.SET_LOADED_BLOGS, payload: data.blogs });
        dispatch({ type: blogActions.UPDATE_SIZE, payload: data.size });
        dispatch({ type: blogActions.UPDATE_SKIP, payload: toSkip });
      }
    });
  };

  return (
    <React.Fragment>
      {head}
      <Box component="main" className={classes.root}>
        <Box component="header" mb={2}>
          <Box component={Toolbar} boxShadow={2}>
            <Typography align="center" variant="h4">
              Programming Blogs And Tutorials
            </Typography>
          </Box>
        </Box>

        <Container maxWidth="xl">
          <Box component="section">
            <Button variant="outlined">Show Categories And Tags</Button>
          </Box>

          <Box component="section" mb={2}>
            <Button variant="outlined">Show All Blogs</Button>
          </Box>
          <Grid
            container
            spacing={4}
            justify="space-around"
            alignItems="center"
          >
            {showAllBlogs()}
          </Grid>
          {size > 0 && size >= limit && (
            <Box p={4}>
              <Button fullWidth variant="outlined" onClick={loadMore}>
                Load More
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </React.Fragment>
  );
}

Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 2;
  return listAllBlogsInfo(skip, limit).then((data) => {
    if (data.error) return {};
    return {
      blogs: data.blogs,
      categories: data.categories,
      tags: data.tags,
      totalBlogs: data.size,
      blogsLimit: limit,
      blogsSkip: skip,
    };
  });
};
