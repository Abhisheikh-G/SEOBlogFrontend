import { useReducer, useEffect } from "react";
import Link from "../../src/Link";
import { useRouter } from "next/router";
import { isAuth, getCookie } from "../../actions/auth";
import { create } from "../../actions/category";
import CustomButton from "../CustomButton";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Divider,
} from "@material-ui/core";

const initialState = {
  name: "",
  error: false,
  success: false,
  categories: [],
  removed: false,
};

const ADD_NAME = "ADD_NAME";
const CREATE_CATEGORY_SUCCESS = "CREATE_CATEGORY_SUCCESS";
const CREATE_CATEGORY_FAILURE = "CREATE_CATEGORY_FAILURE";
const CLEAR_NAME = "CLEAR_NAME";

function reducer(state, action) {
  switch (action.type) {
    case ADD_NAME:
      return { ...state, name: action.value };
    case CLEAR_NAME:
      return { ...state, name: "" };
    case CREATE_CATEGORY_SUCCESS:
      return { ...state, success: true, error: false, name: "" };
    case CREATE_CATEGORY_FAILURE:
      return { ...state, success: false, error: true };
    default:
      throw new Error();
  }
}

export default function Category() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = getCookie("token");

  const handleCreateCategory = async () => {
    const res = await create({ name: state.name }, token);
    const data = await Promise.resolve(res);
    data.error !== undefined
      ? dispatch({ type: CREATE_CATEGORY_FAILURE })
      : dispatch({ type: CREATE_CATEGORY_SUCCESS });
  };

  function newCategoryForm() {
    return (
      <React.Fragment>
        <Box
          component={"form"}
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          p={4}
          mb={1}
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateCategory();
          }}
        >
          <Typography variant="h4">Create New Category:</Typography>
          <Container>
            <TextField
              id="name"
              label="Category Name"
              value={state.name}
              required={true}
              fullWidth={true}
              onChange={(e) =>
                dispatch({ type: ADD_NAME, value: e.target.value })
              }
            />
            <Box pt={2} display="flex" justifyContent="center">
              <CustomButton text="Create Category" type="submit" />
            </Box>
          </Container>
        </Box>
        <Divider />
      </React.Fragment>
    );
  }

  return <React.Fragment>{newCategoryForm()}</React.Fragment>;
}
