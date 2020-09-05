import Head from "next/head";
import Link from "../../src/Link";
import { useState, useReducer, useEffect } from "react";
import renderHTML from "react-render-html";
import moment from "moment";
import BlogCard from "../../components/BlogCard";
import { getBlog, listRelatedBlogs } from "../../actions/blog";
import { API, DOMAIN, APP_NAME } from "../../config";
import { pink } from "@material-ui/core/colors";
import DisqusThread from "../../components/DisqusThread";
import {
  Container,
  Box,
  Typography,
  Button,
  Toolbar,
  makeStyles,
  Grid,
  Chip,
  Divider,
} from "@material-ui/core";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    boxShadow: theme.shadows[4],
  },
  media: {
    height: 180,
  },
  chip: {
    backgroundColor: pink[400],
    margin: theme.spacing(0.5),
  },
  chipTag: {
    backgroundColor: pink[200],
    margin: theme.spacing(0.5),
  },
}));

const blogActions = {
  LOAD_RELATED_BLOGS: "LOAD_RELATED_BLOGS",
};

const initialState = {
  relatedBlogs: [],
};

function blogReducer(state, action) {
  switch (action.type) {
    case blogActions.LOAD_RELATED_BLOGS:
      return { ...state, relatedBlogs: action.payload };
    default:
      break;
  }
}

export default function SingleBlog({ blog }) {
  const classes = useStyles();
  const router = useRouter();
  const [state, dispatch] = useReducer(blogReducer, initialState);

  useEffect(() => {
    loadRelated();
  }, []);

  const loadRelated = () => {
    listRelatedBlogs({ blog }).then((data) => {
      if (!data) console.log("There was a problem loading related blogs.");
      else {
        dispatch({ type: blogActions.LOAD_RELATED_BLOGS, payload: data });
      }
    });
  };

  const head = (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.metaDescription} />
      <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
      <meta property="og:description" content={blog.metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
      <meta
        property="og:image:secure_url"
        content={`${API}/blog/photo/${blog.slug}`}
      />
      <meta property="og:image:type" content="image/type" />

      <link rel="canonical" href={`${DOMAIN}/blogs/${router.pathname}`} />
    </Head>
  );

  const showRelatedBlogs = () => {
    return state.relatedBlogs.map((blog, index) => (
      <BlogCard key={index} isRelated={true} blog={blog} />
    ));
  };

  const showBlogCategories = blog.categories.map((category, index) => (
    <Chip
      key={index}
      size="small"
      className={classes.chip}
      component={Link}
      href={`/categories/${category.slug}`}
      label={category.name}
    />
  ));

  const showBlogTags = blog.tags.map((tag, index) => (
    <Chip
      key={index}
      size="small"
      className={classes.chipTag}
      component={Link}
      href={`/tags/${tag.slug}`}
      label={tag.name}
    />
  ));

  return (
    <React.Fragment>
      {head}
      <Grid container direction="column">
        <Grid item>
          <Box
            component="img"
            width="100%"
            maxHeight="35em"
            p={4}
            style={{ objectFit: "contain" }}
            src={`${API}/blog/photo/${blog.slug}`}
            alt={blog.slug}
          />
        </Grid>
        <Grid item>
          <Container maxWidth="lg">
            <Typography gutterBottom variant="h4" align="center" component="h1">
              {blog.title}
            </Typography>
            <Typography
              gutterBottom
              variant="caption"
              align="center"
              component="h3"
            >
              Written by:{" "}
              <Link href={`/profile/${blog.author.username}`}>
                {blog.author.username}
              </Link>{" "}
              | Published at:
              {` ${moment(blog.updatedAt).fromNow()}`}
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Typography variant="caption">Categories:</Typography>
              {showBlogCategories}
            </Box>
            <Typography variant="body2" color="textSecondary" component="p">
              {renderHTML(blog.body)}
            </Typography>
          </Container>
        </Grid>
        <Divider />
        <Grid item>
          <Typography variant="h5">Related Blog Posts:</Typography>
          <Box m={4}>
            <Container maxWidth="lg">
              <Grid container justify="space-around" spacing={4}>
                {showRelatedBlogs()}
              </Grid>
            </Container>
          </Box>
        </Grid>
        <Grid item>
          <Box>
            <Container maxWidth="lg">
              <Typography variant="h5">Comments:</Typography>
              <DisqusThread
                id={blog._id}
                title={blog.title}
                path={`/blog/${blog.slug}`}
              />
            </Container>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

SingleBlog.getInitialProps = ({ query }) => {
  const { slug } = query;

  return getBlog(slug).then((data) => {
    if (data.error) console.log(data);
    else {
      return { blog: data };
    }
  });
};
