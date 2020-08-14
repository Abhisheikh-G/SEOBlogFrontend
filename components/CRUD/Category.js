import { useReducer, useEffect, useState } from "react";
import Link from "../../src/Link";
import { useRouter } from "next/router";
import { isAuth, getCookie } from "../../actions/auth";
import {
  create,
  getCategories,
  getCategory,
  removeCategory,
} from "../../actions/category";
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
} from "@material-ui/core";

const initialState = {
  name: "",
  error: false,
  errorMessage: "",
  success: false,
  categories: [],
  removed: false,
  reload: false,
};

const categoryActions = {
  ADD_NAME: "ADD_NAME",
  CREATE_CATEGORY_SUCCESS: "CREATE_CATEGORY_SUCCESS",
  CREATE_CATEGORY_FAILURE: "CREATE_CATEGORY_FAILURE",
  DELETE_CATEGORY_SUCCESS: "DELETE_CATEGORY_SUCCESS",
  DELETE_CATEGORY_FAILURE: "DELETE_CATEGORY_FAILURE",
  GET_CATEGORIES_SUCCESS: "GET_CATEGORIES_SUCCESS",
  GET_CATEGORIES_FAILURE: "GET_CATEGORIES_FAILURE",
};

function reducer(state, action) {
  switch (action.type) {
    case categoryActions.ADD_NAME:
      return { ...state, name: action.value };
    case categoryActions.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        success: true,
        error: false,
        name: "",
        reload: !state.reload,
      };
    case categoryActions.CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        success: false,
        error: true,
        errorMessage: action.payload,
      };
    case categoryActions.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        success: true,
        error: false,
        reload: !state.reload,
        removed: true,
      };
    case categoryActions.DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        success: false,
        error: true,
        errorMessage: action.payload,
      };
    case categoryActions.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        success: false,
        error: true,
        errorMessage: action.payload,
      };
    case categoryActions.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        success: true,
        error: false,
        categories: action.payload,
        reload: state.reload,
      };
    default:
      throw new Error();
  }
}

export default function Category({ handleClose, open }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = getCookie("token");

  useEffect(() => {
    loadCategories();
  }, [state.reload]);

  const loadCategories = async () => {
    const res = await getCategories();
    const data = await Promise.resolve(res);

    !!data.error
      ? dispatch({
          type: categoryActions.GET_CATEGORIES_FAILURE,
        })
      : dispatch({
          type: categoryActions.GET_CATEGORIES_SUCCESS,
          payload: data,
        });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (answer) {
      deleteCategory(slug);
    }
  };

  const deleteCategory = async (slug) => {
    const res = await removeCategory(slug, token);
    const data = await Promise.resolve(res);

    !!data.error
      ? dispatch({
          type: categoryActions.DELETE_CATEGORY_FAILURE,
          payload: data.error,
        })
      : dispatch({ type: categoryActions.DELETE_CATEGORY_SUCCESS });
  };

  const showCategories = () => (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" display="inline">
          All Categories:
        </Typography>
        <Button variant="outlined" onClick={() => loadCategories()}>
          Refresh
        </Button>
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" m={2}>
        {state.categories.map((category, index) => {
          return (
            <Button
              title="double click to delete"
              onDoubleClick={() => deleteConfirm(category.slug)}
              style={{ margin: ".5em" }}
              variant="outlined"
              key={index}
            >
              {category.name}
            </Button>
          );
        })}
      </Box>
    </React.Fragment>
  );

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const res = await create({ name: state.name }, token);
    const data = await Promise.resolve(res);
    !!data.error
      ? dispatch({
          type: categoryActions.CREATE_CATEGORY_FAILURE,
          payload: data.error,
        })
      : dispatch({
          type: categoryActions.CREATE_CATEGORY_SUCCESS,
        });
  };

  function newCategoryForm() {
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create New Category:</DialogTitle>
          <Box
            component={"form"}
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            p={4}
            mb={1}
            onSubmit={(e) => handleCreateCategory(e)}
          >
            <DialogContent>
              <Container>
                <TextField
                  id="name"
                  label="Category Name"
                  value={state.name}
                  required={true}
                  fullWidth={true}
                  onChange={(e) =>
                    dispatch({
                      type: categoryActions.ADD_NAME,
                      value: e.target.value,
                    })
                  }
                />
                <Box pt={2} display="flex" justifyContent="center">
                  <CustomButton text="Create Category" type="submit" />
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

  return (
    <React.Fragment>
      {newCategoryForm()}
      {showCategories()}
    </React.Fragment>
  );
}
