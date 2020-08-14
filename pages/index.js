import React from "react";
import Link from "../src/Link";
import CustomButton from "../components/CustomButton/CustomButton";
import Parallax from "../components/Parallax/Parallax";

import {
  makeStyles,
  Grid,
  Typography,
  Paper,
  Container,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  infoSection: {
    backgroundColor: theme.palette.grey[100],
  },
  heroTitle: {
    color: theme.palette.primary.contrastText,
    textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
  },
}));

export default function Index() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Parallax image={"/nextjs_header.jpg"}>
        <Grid
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
      </Parallax>

      <Container
        component={Box}
        position="relative"
        maxWidth="xl"
        pb={0}
        mb={0}
      >
        <Box component={Paper} width="100%" height="50vh">
          <Typography align="center" variant="h2">
            Hello
          </Typography>
        </Box>
      </Container>

      <Box
        component={"img"}
        display="block"
        src="/bg.jpg"
        m={8}
        mx={"auto"}
        boxShadow={2}
      />

      <Container maxWidth="xl">
        <Box component={Paper} width="100%" height="100%">
          <Typography align="center" variant="h2">
            Hi!
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
}
