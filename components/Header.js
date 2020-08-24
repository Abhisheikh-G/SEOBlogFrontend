import AppBar from "@material-ui/core/AppBar";
import Link from "../src/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Tabs, Tab, Toolbar, Button } from "@material-ui/core";
import { APP_NAME } from "../config";
import { isAuth, signout } from "../actions/auth";
import Search from "../components/Search";
import Router from "next/router";

const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: theme.palette.primary.contrastText,
  },
  logo: {
    textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
  },
  tabsContainer: { marginLeft: "auto", display: "flex" },
  tab: {
    transition: "all .2s ease-in",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
      backgroundColor: theme.palette.primary.dark,
    },
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
}));

export default function Header() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Box>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              <Typography button="true" className={classes.logo} variant="h3">
                {APP_NAME}
              </Typography>
            </Link>
          </Box>

          <Box className={classes.tabsContainer}>
            <Box my="auto" mr="10px">
              <Search />
            </Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              classes={{ indicator: classes.indicator }}
            >
              <Tab
                label={`Blogs`}
                className={classes.tab}
                component={Button}
                onClick={() => Router.push("/blogs")}
              />
              {isAuth() && (
                <Tab
                  label={`${isAuth().name}'s Dashboard`}
                  className={classes.tab}
                  component={Button}
                  onClick={() =>
                    Router.replace(isAuth().role === 1 ? "/admin" : "/user")
                  }
                />
              )}
              {isAuth() && (
                <Tab
                  label="Sign Out"
                  className={classes.tab}
                  onClick={() => signout(() => Router.replace("/signin"))}
                />
              )}
              {!isAuth() && (
                <Tab
                  component={Link}
                  href="/signup"
                  label="Sign Up"
                  className={classes.tab}
                />
              )}
              {!isAuth() && (
                <Tab
                  component={Link}
                  href="/signin"
                  label="Sign In"
                  className={classes.tab}
                />
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
