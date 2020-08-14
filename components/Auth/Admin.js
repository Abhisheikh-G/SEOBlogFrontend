import { useEffect } from "react";
import Router from "next/router";

import { isAuth } from "../../actions/auth";
import { Box } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minHeight: "100vh",
  },
}));

const Admin = ({ children }) => {
  const classes = useStyles();
  useEffect(() => {
    if (!isAuth()) {
      Router.push("/signin");
    } else if (isAuth().role !== 1) {
      Router.push("/");
    }
  }, []);

  return <Box className={classes.root}>{children}</Box>;
};

export default Admin;
