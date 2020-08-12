import React from "react";
import Admin from "../../components/auth/Admin";
import AdminHeader from "../../components/auth/AdminHeader";
import { makeStyles } from "@material-ui/core";
import AdminLayout from "../../components/auth/AdminLayout";

const useStyles = makeStyles((theme) => ({}));

export default function AdminIndex() {
  const classes = useStyles();

  return (
    <Admin>
      <AdminHeader>Admin Home</AdminHeader>
      <AdminLayout>Right</AdminLayout>
    </Admin>
  );
}
