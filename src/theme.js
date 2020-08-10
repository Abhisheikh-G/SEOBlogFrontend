import { createMuiTheme } from "@material-ui/core/styles";
import { red, grey, blue, purple } from "@material-ui/core/colors";

const primaryColor = grey[900];
const secondaryColor = blue[200];

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    h3: {
      fontWeight: 300,
    },
  },
});

export default theme;
