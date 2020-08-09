import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    textDecoration: "none",
    transition: "all .2s ease-in",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export default function CustomButton({ text }) {
  const classes = useStyles();

  return (
    <Button variant="outlined" className={classes.button}>
      {text}
    </Button>
  );
}
