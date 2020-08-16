import { createMuiTheme } from "@material-ui/core/styles";
import { red, grey, cyan } from "@material-ui/core/colors";

const primaryColor = grey[900];
const secondaryColor = cyan[900];

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
      default: grey[200],
    },
  },
  typography: {
    h3: {
      fontWeight: 300,
    },
  },
});

export default theme;
