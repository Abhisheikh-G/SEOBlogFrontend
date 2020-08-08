import { createMuiTheme } from "@material-ui/core/styles";
import { red, grey, blue } from "@material-ui/core/colors";

const primaryColor = grey[800];
const secondaryColor = blue[800];

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
