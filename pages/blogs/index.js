import Head from "next/head";
import Link from "../../src/Link";
import { useState } from "react";
import renderHTML from "react-render-html";
import moment from "moment";
import { listAllBlogsInfo } from "../../actions/blog";
import { API } from "../../config";
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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minHeight: "100vh",
  },
}));

export default function Blogs({ blogs, categories, tags, size }) {
  const classes = useStyles();

  const showAllBlogs = () => {
    return blogs.map((blog, index) => <BlogCard blog={blog} />);
  };

  return (
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

        <Box component="section">
          <Button variant="outlined">Show All Blogs</Button>
          <Grid
            container
            spacing={4}
            justify="space-around"
            alignItems="center"
          >
            {showAllBlogs()}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

Blogs.getInitialProps = () => {
  return listAllBlogsInfo().then((data) => {
    if (data.error) return {};
    return {
      blogs: data.blogs,
      categories: data.categories,
      tags: data.tags,
      size: data.size,
    };
  });
};
