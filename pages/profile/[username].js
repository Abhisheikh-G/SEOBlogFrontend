import Head from "next/head";
import Link from "../../src/Link";
import { useState, useReducer, useEffect } from "react";
import moment from "moment";
import BlogCard from "../../components/BlogCard";
import { retrieveProfile } from "../../actions/user";
import { API, DOMAIN, APP_NAME } from "../../config";
import {
  Container,
  Box,
  makeStyles,
  Typography,
  Avatar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minHeight: "100vh",
    paddingTop: "3em",
  },
  largeIcon: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: theme.spacing(2),
  },
}));

export default function UserProfile({ user, blogs, query }) {
  const classes = useStyles();

  const head = (
    <Head>
      <title>
        {user.name} | {APP_NAME}
      </title>
      <meta name="description" content={`Blogs by ${user.name}`} />
      <meta property="og:title" content={`${user.username} | ${APP_NAME}`} />
      <meta property="og:description" content={`Blogs by ${user.name}`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`/bg.jpg`} />
      <meta property="og:image:secure_url" content={`/bg.jpg`} />
      <meta property="og:image:type" content="image/type" />

      <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
    </Head>
  );

  const showBlogs = () =>
    blogs.map((blog, index) => (
      <React.Fragment>
        <Box m={2} display="flex" justifyContent="space-between">
          <Link href={`/blogs/${blog.slug}`}>
            <Typography variant="h6" component="a">
              {blog.title}
            </Typography>
          </Link>
          <Box>
            <Typography variant="caption">
              Created at: {moment(blog.createdAt).fromNow()}
            </Typography>
          </Box>
        </Box>
      </React.Fragment>
    ));

  return (
    <React.Fragment>
      {head}
      <Container maxWidth="xl" className={classes.root}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height={275}
          width={275}
          boxShadow={4}
          pt={4}
          mx={"auto"}
        >
          <Avatar
            className={classes.largeIcon}
            src={`${API}/user/photo/${user.username}`}
            alt="user profile"
          />
          <Typography align="center" variant="h4">
            {user.name}
          </Typography>
        </Box>
        <Box
          pt={5}
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Box boxShadow={4} p={4}>
            <Typography variant="h4">Recent Blog Posts:</Typography>
            {showBlogs()}
          </Box>
          <Box boxShadow={4} height="10em" width="10em">
            h
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

UserProfile.getInitialProps = ({ query }) => {
  return retrieveProfile(query.username).then((data) => {
    if (data.error) console.log(data.error);
    else {
      return { user: data.user, blogs: data.blogs, query };
    }
  });
};
