import React from "react";
import Link from "../src/Link";
import CustomButton from "../components/CustomButton";
import { makeStyles, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  heroSection: {
    height: "20em",
    backgroundColor: theme.palette.secondary.main,
  },
  heroTitle: {
    color: theme.palette.primary.contrastText,
    textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
  },
}));

export default function Index() {
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Grid
        className={classes.heroSection}
        item
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h1" className={classes.heroTitle}>
            BLOG
          </Typography>
        </Grid>
        <Grid item container justify="space-around" style={{ width: "20%" }}>
          <Grid item>
            <Link href="/signup">
              <CustomButton text="Sign Up" />
            </Link>
          </Grid>
          <Grid item>
            <Link href="/signin">
              <CustomButton text="Sign In" />
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
