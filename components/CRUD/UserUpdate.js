import { useReducer, useEffect, useState } from "react";
import Link from "../../src/Link";
import { useRouter } from "next/router";
import { API } from "../../config";
import { getCookie, updateUser } from "../../actions/auth";
import { authRetrieveProfile, updateProfile } from "../../actions/user";
import {
  Box,
  Grid,
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Hidden,
  makeStyles,
  InputLabel,
  Avatar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minHeight: "100vh",
  },
  form: {
    width: 450,
    height: "auto",
  },
  textfield: {
    margin: theme.spacing(1),
  },
  largeIcon: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: theme.spacing(2),
  },
}));

const initialState = {
  username: "",
  name: "",
  email: "",
  password: "",
  message: "",
  about: "",
  error: false,
  success: false,
  loading: false,
  photo: "",
  userData: "",
};

const userActions = {
  UPDATE_FIELD: "UPDATE_FIELD",
  CLEAR_MESSAGE: "CLEAR_MESSAGE",
  RETRIEVE_PROFILE_ERROR: "RETRIEVE_PROFILE_ERROR",
  RETRIEVE_PROFILE_SUCCESS: "RETRIEVE_PROFILE_SUCCESS",
  INIT_USER_DATA: "INIT_USER_DATA",
  SUBMIT_FORM_START: "SUBMIT_FORM_START",
  SUBMIT_FORM_FAILURE: "SUBMIT_FORM_FAILURE",
  SUBMIT_FORM_SUCCESS: "SUBMIT_FORM_SUCCESS",
};

function reducer(state, action) {
  switch (action.type) {
    case userActions.CLEAR_MESSAGE:
      return { ...state, message: "", success: false, error: false };
    case userActions.UPDATE_FIELD:
      return { ...state, [action.payload.name]: action.payload.value };
    case userActions.RETRIEVE_PROFILE_ERROR:
      return { ...state, error: action.payload };
    case userActions.RETRIEVE_PROFILE_SUCCESS:
      return { ...state, ...action.payload };
    case userActions.INIT_USER_DATA:
      return { ...state, userData: new FormData() };
    case userActions.SUBMIT_FORM_START:
      return { ...state, loading: true };
    case userActions.SUBMIT_FORM_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case userActions.SUBMIT_FORM_SUCCESS:
      return { ...state, success: true, message: action.payload };
    default:
      return state;
  }
}

export default function UserUpdate() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();
  const token = getCookie("token");
  const {
    username,
    name,
    email,
    password,
    about,
    message,
    error,
    success,
    loading,
    photo,
    userData,
  } = state;

  useEffect(() => {
    authRetrieveProfile(token).then((data) => {
      if (data.error)
        dispatch({
          type: userActions.RETRIEVE_PROFILE_ERROR,
          payload: data.error,
        });
      else {
        dispatch({
          type: userActions.RETRIEVE_PROFILE_SUCCESS,
          payload: data,
        });
      }
    });

    dispatch({ type: userActions.INIT_USER_DATA });
  }, [, success]);

  const handleChangeField = (e) => {
    const name = e.target.name;
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    !!window && localStorage.setItem(name, JSON.stringify(value));
    userData.set([name], value);
    dispatch({ type: userActions.UPDATE_FIELD, payload: { name, value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: userActions.SUBMIT_FORM_START });
    updateProfile(token, userData).then((data) => {
      if (data.error)
        dispatch({
          type: userActions.SUBMIT_FORM_FAILURE,
          payload: data.error,
        });
      else {
        updateUser(data.user, () => {
          dispatch({
            type: userActions.RETRIEVE_PROFILE_SUCCESS,
            payload: data.user,
          });
          dispatch({
            type: userActions.SUBMIT_FORM_SUCCESS,
            payload: data.message,
          });
        });
      }
    });
  };

  const addPhoto = () => (
    <>
      <Avatar
        className={classes.largeIcon}
        src={`${API}/user/photo/${username}`}
        alt="user profile"
      />

      <Button component="label" variant="outlined" disableRipple>
        Profile Photo:{" "}
        <input
          name="photo"
          onChange={handleChangeField}
          type="file"
          accept="image/*"
          hidden
        />
      </Button>
    </>
  );

  function updateProfileForm() {
    return (
      <React.Fragment>
        <Grid item style={{ marginBottom: "5em" }}>
          <Box
            component="form"
            className={classes.form}
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {addPhoto()}
            <TextField
              className={classes.textfield}
              id="username"
              name="username"
              label="Username"
              value={state.username}
              fullWidth={true}
              onChange={handleChangeField}
            />
            <TextField
              className={classes.textfield}
              id="name"
              name="name"
              label="Name"
              value={state.name}
              fullWidth={true}
              onChange={handleChangeField}
            />
            <TextField
              className={classes.textfield}
              id="email"
              name="email"
              label="E-Mail"
              value={state.email}
              fullWidth={true}
              onChange={handleChangeField}
            />
            <TextField
              className={classes.textfield}
              id="about"
              name="about"
              label="About"
              value={state.about}
              multiline={true}
              fullWidth={true}
              onChange={handleChangeField}
            />
            <TextField
              className={classes.textfield}
              id="password"
              name="password"
              label="Password"
              type="password"
              value={state.password}
              fullWidth={true}
              onChange={handleChangeField}
            />
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </Box>
        </Grid>
      </React.Fragment>
    );
  }

  const showSuccess = () =>
    state.success && (
      <Alert
        severity="success"
        role="alert"
        component={Box}
        mb={2}
        onClose={() => dispatch({ type: "CLEAR_MESSAGE" })}
      >
        {state.message}
      </Alert>
    );
  const showError = () =>
    state.error && (
      <Alert
        severity="error"
        role="alert"
        component={Box}
        mb={2}
        onClose={() => dispatch({ type: "CLEAR_MESSAGE" })}
      >
        {state.message}
      </Alert>
    );

  return (
    <React.Fragment>
      <Box className={classes.root}>
        {showError()}
        {showSuccess()}
        <Container className={classes.root} maxWidth="xl">
          <Grid
            className={classes.root}
            container
            justify="center"
            alignItems="center"
          >
            {updateProfileForm()}
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
}
