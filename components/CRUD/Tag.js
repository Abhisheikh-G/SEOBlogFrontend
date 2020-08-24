import { useReducer, useEffect, useState } from "react";
import Link from "../../src/Link";
import { useRouter } from "next/router";
import { isAuth, getCookie } from "../../actions/auth";
import { create, getTags, getTag, removeTag } from "../../actions/tag";
import CustomButton from "../CustomButton/CustomButton";
import {
  Box,
  TextField,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
  Snackbar,
  Hidden,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const initialState = {
  name: "",
  error: false,
  message: "",
  success: false,
  tags: [],
  removed: false,
  reload: false,
};

const tagActions = {
  ADD_NAME: "ADD_NAME",
  CLEAR_MESSAGE: "CLEAR_MESSAGE",
  CREATE_TAG_SUCCESS: "CREATE_TAG_SUCCESS",
  CREATE_TAG_FAILURE: "CREATE_TAG_FAILURE",
  DELETE_TAG_SUCCESS: "DELETE_TAG_SUCCESS",
  DELETE_TAG_FAILURE: "DELETE_TAG_FAILURE",
  GET_TAGS_SUCCESS: "GET_TAGS_SUCCESS",
  GET_TAGS_FAILURE: "GET_TAGS_FAILURE",
};

function reducer(state, action) {
  switch (action.type) {
    case tagActions.CLEAR_MESSAGE:
      return { ...state, message: "", success: false, error: false };
    case tagActions.ADD_NAME:
      return { ...state, name: action.value };
    case tagActions.CREATE_TAG_SUCCESS:
      return {
        ...state,
        success: true,
        error: false,
        name: "",
        reload: !state.reload,
        message: "Tag successfully created.",
      };
    case tagActions.CREATE_TAG_FAILURE:
      return {
        ...state,
        success: false,
        error: true,
        message: action.payload,
      };
    case tagActions.DELETE_TAG_SUCCESS:
      return {
        ...state,
        success: true,
        error: false,
        reload: !state.reload,
        removed: true,
        message: action.payload,
      };
    case tagActions.DELETE_TAG_FAILURE:
      return {
        ...state,
        success: false,
        error: true,
        message: action.payload,
      };
    case tagActions.GET_TAGS_FAILURE:
      return {
        ...state,
        success: false,
        error: true,
        message: action.payload,
      };
    case tagActions.GET_TAGS_SUCCESS:
      return {
        ...state,
        error: false,
        tags: action.payload,
        reload: state.reload,
      };
    default:
      throw new Error();
  }
}

export default function Tag({ handleClose, open }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = getCookie("token");

  useEffect(() => {
    loadTags();
  }, [state.reload]);

  const loadTags = async () => {
    const res = await getTags();
    const data = await Promise.resolve(res);

    !!data.error
      ? dispatch({
          type: tagActions.GET_TAGS_FAILURE,
        })
      : dispatch({
          type: tagActions.GET_TAGS_SUCCESS,
          payload: data,
        });
  };

  const deleteTag = async (slug) => {
    let answer = window.confirm(`Are you sure you want to delete this tag?`);
    if (answer) {
      const res = await removeTag(slug, token);
      const data = await Promise.resolve(res);

      !!data.error
        ? dispatch({
            type: tagActions.DELETE_TAG_FAILURE,
            payload: data.error,
          })
        : dispatch({
            type: tagActions.DELETE_TAG_SUCCESS,
            payload: data.message,
          });
    }
  };

  const showTags = () => (
    <React.Fragment>
      <Box display="flex" justifyContent="space-around">
        <Typography variant="h5" display="inline">
          All Tags:
        </Typography>
        <Button variant="outlined" onClick={() => loadTags()}>
          Refresh
        </Button>
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" m={2}>
        {state.tags.map((tag, index) => {
          return (
            <Button
              title="double click to delete"
              onDoubleClick={() => deleteTag(tag.slug)}
              style={{ margin: ".5em" }}
              variant="outlined"
              key={index}
            >
              {tag.name}
            </Button>
          );
        })}
      </Box>
    </React.Fragment>
  );

  const handleCreateTag = async (e) => {
    e.preventDefault();
    const res = await create({ name: state.name }, token);
    const data = await Promise.resolve(res);
    !!data.error
      ? await dispatch({
          type: tagActions.CREATE_TAG_FAILURE,
          payload: data.error,
        })
      : await dispatch({
          type: tagActions.CREATE_TAG_SUCCESS,
        });

    console.log(data);
  };

  function newTagForm() {
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create New Tag:</DialogTitle>
          <Box
            component={"form"}
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            p={4}
            mb={1}
            onSubmit={(e) => handleCreateTag(e)}
          >
            <DialogContent>
              <Container>
                <TextField
                  id="name"
                  label="Tag Name"
                  value={state.name}
                  required={true}
                  fullWidth={true}
                  onChange={(e) =>
                    dispatch({
                      type: tagActions.ADD_NAME,
                      value: e.target.value,
                    })
                  }
                />
                <Box pt={2} display="flex" justifyContent="center">
                  <CustomButton text="Create Tag" type="submit" />
                </Box>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
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
      {showSuccess()}
      {showError()}
      {newTagForm()}
      {showTags()}
    </React.Fragment>
  );
}
