import React from "react";
import Admin from "../../components/auth/Admin";
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

export default function AdminIndex() {
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
        <Admin>
          <Grid item>
            <Typography variant="h1" className={classes.heroTitle}>
              Admin Dashboard
            </Typography>
          </Grid>
        </Admin>
      </Grid>
    </Grid>
  );
}
