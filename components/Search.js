import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Link from "../src/Link";
import { useReducer, useEffect } from "react";
import { Button, Box, Divider, Typography } from "@material-ui/core";
import { searchBlogs } from "../actions/blog";
import { useModal } from "../actions/hooks";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.common.black,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    marginLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const initialState = {
  search: undefined,
  results: [],
  message: "",
};

const searchActions = {
  SET_SEARCH_RESULTS: "SET_SEARCH_RESULTS",
  SET_SEARCH_FIELD: "SET_SEARCH_FIELD",
};

function searchReducer(state, action) {
  switch (action.type) {
    case searchActions.SET_SEARCH_RESULTS:
      return {
        ...state,
        results: action.payload,
        message: `${action.payload.length} blogs found.`,
      };
    case searchActions.SET_SEARCH_FIELD:
      return { ...state, ...initialState, search: action.payload };
    default:
      return { ...state };
  }
}

export default function Search() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(searchReducer, searchActions);
  const { search, results, searched, message } = state;

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    searchBlogs({ search })
      .then((data) => {
        dispatch({ type: searchActions.SET_SEARCH_RESULTS, payload: data });
      })
      .catch((error) => console.log(error));
  };

  const handleSearchChange = (e) => {
    dispatch({ type: searchActions.SET_SEARCH_FIELD, payload: e.target.value });
  };

  const displayResults = (
    <Box
      bgcolor="#fff"
      color="#000"
      width="auto"
      boxShadow={1}
      position="absolute"
      display="flex"
      flexDirection="column"
      height="auto"
      width="275px"
    >
      {results &&
        results.map((blog, index) => (
          <>
            <Box key={`${blog.title} ${index}`} m={1}>
              <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
            </Box>
            <Divider />
          </>
        ))}
      <Box marginLeft="auto" p={1}>
        <Typography variant="caption">{message}</Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <form onSubmit={handleSubmitSearch}>
        <Box display="flex" className={classes.inputRoot}>
          <InputBase
            placeholder="Search…"
            value={search}
            onChange={handleSearchChange}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
          <Box
            component={Button}
            width="auto"
            type="submit"
            variant="text"
            m="auto"
            pr="10px"
          >
            <SearchIcon />
          </Box>
        </Box>
      </form>
      {message && displayResults}
    </>
  );
}
