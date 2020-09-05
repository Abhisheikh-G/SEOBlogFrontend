import fetch from "isomorphic-fetch";
import { API } from "../config";
import { isAuth, handleResponse } from "./auth";
import queryString from "query-string";

export const createBlog = (blog, token) => {
  let blogEndpoint;

  if (isAuth() && isAuth().role === 1) blogEndpoint = `${API}/blog`;
  if (isAuth() && isAuth().role === 0) blogEndpoint = `${API}/user/blog`;

  return fetch(blogEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      handleResponse(response);
      return response.json({ message: "Successfully created blog." });
    })
    .catch((err) => console.log(err));
};

export const listAllBlogsInfo = (skip, limit) => {
  const data = { limit, skip };

  return fetch(`${API}/blogs-categories-tags`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getBlog = (slug) => {
  return fetch(`${API}/blog/${slug}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listRelatedBlogs = (blog) => {
  return fetch(`${API}/blogs/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listAllBlogs = (username) => {
  let blogEndpoint;

  if (username) blogEndpoint = `${API}/${username}/blogs`;
  else blogEndpoint = `${API}/blogs`;

  return fetch(blogEndpoint, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removeBlog = (slug, token) => {
  let apiEndpoint;

  if (isAuth() && isAuth().role === 1) apiEndpoint = `${API}/blog/${slug}`;
  if (isAuth() && isAuth().role === 0) apiEndpoint = `${API}/user/blog/${slug}`;

  return fetch(apiEndpoint, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      handleResponse(response);

      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateBlog = (blog, token, slug) => {
  let apiEndpoint;

  if (isAuth() && isAuth().role === 1) apiEndpoint = `${API}/blog/${slug}`;
  if (isAuth() && isAuth().role === 0) apiEndpoint = `${API}/user/blog/${slug}`;

  return fetch(apiEndpoint, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      handleResponse(response);

      return response.json({ message: "Successfully created blog." });
    })
    .catch((err) => console.log(err));
};

export const userUpdateBlog = (blog, token, slug) => {
  return fetch(`${API}/blog/${slug}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      handleResponse(response);

      return response.json({ message: "Successfully created blog." });
    })
    .catch((err) => console.log(err));
};

export const searchBlogs = (params) => {
  let query = queryString.stringify(params);
  return fetch(`${API}/blogs/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
