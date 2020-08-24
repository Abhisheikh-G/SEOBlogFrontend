import Head from "next/head";
import BlogCard from "../../components/BlogCard";
import { getCategory } from "../../actions/category";
import { API, DOMAIN, APP_NAME } from "../../config";
import { pink } from "@material-ui/core/colors";

import {
  Container,
  Box,
  Typography,
  Button,
  Toolbar,
  makeStyles,
  Grid,
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

export default function SingleTag({ category, blogs }) {
  const classes = useStyles();
  const router = useRouter();

  const head = (
    <Head>
      <title>
        {category.name} | {APP_NAME}
      </title>

      <meta
        name="description"
        content={`All blogs related to ${category.name}`}
      />
      <meta property="og:title" content={`${category.name} | ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`All blogs related to ${category.name}`}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${DOMAIN}/categories/${category.name}`}
      />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${API}/blog/photo/${blogs[0].slug}`}
      />
      <meta
        property="og:image:secure_url"
        content={`${API}/blog/photo/${blogs[0].slug}`}
      />
      <meta property="og:image:type" content="image/type" />

      <link rel="canonical" href={`${DOMAIN}/categories/${category.name}`} />
    </Head>
  );

  const showRelatedBlogs = () => {
    return blogs.map((blog, index) => (
      <BlogCard isRelated={false} key={index} blog={blog} />
    ));
  };

  return (
    <React.Fragment>
      {head}
      <Grid container direction="column">
        <Grid item>
          <Container component={Box} p={4} maxWidth="lg">
            <Typography gutterBottom variant="h3" align="center" component="h1">
              Blogs Related To {category.name}:
            </Typography>
          </Container>
        </Grid>
        <Divider />
        <Grid item>
          <Box m={4}>
            <Container maxWidth="lg">
              <Grid container justify="space-around" spacing={4}>
                {showRelatedBlogs()}
              </Grid>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

SingleTag.getInitialProps = ({ query }) => {
  const { slug } = query;

  return getCategory(slug).then((data) => {
    if (data.error) console.log(data);
    else {
      return { category: data.category, blogs: data.blogs };
    }
  });
};
