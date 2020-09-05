import Link from "../src/Link";
import renderHTML from "react-render-html";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Chip, Box, Grid } from "@material-ui/core";
import { red, pink } from "@material-ui/core/colors";
import { API } from "../config";
import { getThemeProps } from "@material-ui/styles";
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

export default function BlogCard({ isRelated, blog }) {
  const classes = useStyles();
  const router = useRouter();

  const showBlogCategories = blog.categories.map((category, index) => (
    <Chip
      size="small"
      className={classes.chip}
      component={Link}
      href={`/categories/${category.slug}`}
      label={category.name}
    />
  ));

  const showBlogTags = blog.tags.map((tag, index) => (
    <Chip
      size="small"
      className={classes.chipTag}
      component={Link}
      href={`/tags/${tag.slug}`}
      label={tag.name}
    />
  ));

  return (
    <Grid item>
      <Card
        variant="outlined"
        raised={true}
        className={classes.root}
        key={`${blog.title}`}
      >
        <CardActionArea disableRipple style={{ cursor: "auto" }}>
          <CardMedia
            className={classes.media}
            image={`${API}/blog/photo/${blog.slug}`}
            title={blog.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              align="center"
              style={{ cursor: "pointer", width: "auto" }}
              onClick={() => router.push(`/blogs/${blog.slug}`)}
            >
              {blog.title}
            </Typography>
            <Typography gutterBottom variant="caption" component="h3">
              Written by:{" "}
              <Link href={`/profile/${blog.author.username}`}>
                {blog.author.username}
              </Link>{" "}
              | Published at:
              {` ${moment(blog.updatedAt).fromNow()}`}
            </Typography>
            {!isRelated && (
              <Box>
                <Typography variant="caption">Categories:</Typography>
                {showBlogCategories}
              </Box>
            )}

            {!isRelated && (
              <Typography variant="body2" color="textSecondary" component="p">
                {renderHTML(blog.excerpt)}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            component={Link}
            href={`/blogs/${blog.slug}`}
            size="small"
            color="primary"
          >
            Read More
          </Button>
        </CardActions>
        {!isRelated && (
          <CardContent>
            <Box>
              <Typography variant="caption">Tags:</Typography>
              {showBlogTags}
            </Box>
          </CardContent>
        )}
      </Card>
    </Grid>
  );
}
