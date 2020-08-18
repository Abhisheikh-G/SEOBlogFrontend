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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    boxShadow: theme.shadows[4],
  },
  media: {
    height: 140,
  },
}));

export default function BlogCard({ blog }) {
  const classes = useStyles();

  const showBlogCategories = blog.categories.map((category, index) => (
    <Chip
      component={Link}
      href={`categories/${category.slug}`}
      label={category.name}
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
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={blog.photo}
            title={blog.title}
          />
          <CardContent>
            <Typography gutterBottom variant="subtitle1" component="h2">
              Written by: {blog.author.name} | Published at:
              {` ${moment(blog.updatedAt).fromNow()}`}
            </Typography>
            <Box>{showBlogCategories}</Box>
            <Typography variant="body2" color="textSecondary" component="p">
              {renderHTML(blog.excerpt)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            component={Link}
            href={`blogs/${blog.slug}`}
            size="small"
            color="primary"
          >
            Read More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
