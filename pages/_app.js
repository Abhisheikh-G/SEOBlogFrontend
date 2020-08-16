import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import theme from "../src/theme";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NextNprogress from "nextjs-progressbar";
import "../node_modules/react-quill/dist/quill.snow.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "inherit",
    minHeight: "100vh",
    position: "relative",
  },
}));

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const classes = useStyles();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NextNprogress height="5" />

        <Header />
        <Box className={classes.root}>
          <Component {...pageProps} />
        </Box>
        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
