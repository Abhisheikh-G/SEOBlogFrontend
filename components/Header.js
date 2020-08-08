import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Tabs, Tab, Toolbar } from "@material-ui/core";
import { APP_NAME } from "../config";

const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: theme.palette.primary.contrastText,
  },
  tabsContainer: {
    marginLeft: "auto",
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
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
            <Typography variant="h3">{APP_NAME}</Typography>
          </Box>
          <Box className={classes.tabsContainer}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              classes={{ indicator: classes.indicator }}
            >
              <Tab label="Item One" />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
