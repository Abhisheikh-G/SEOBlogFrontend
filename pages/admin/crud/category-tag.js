import React from "react";
import Admin from "../../../components/auth/Admin";
import AdminHeader from "../../../components/auth/AdminHeader";
import AdminLayout from "../../../components/auth/AdminLayout";
import Category from "../../../components/crud/Category";
import { makeStyles, Grid, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

export default function AdminIndex() {
  const classes = useStyles();

  const layout = (
    <React.Fragment>
      <Grid container>
        <Grid item md={6}>
          <Box>Manage Categories</Box>
          <Category />
        </Grid>
        <Grid item md={6}>
          <Box>Tags</Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );

  return (
    <Admin>
      <AdminHeader>Manage Categories And Tags</AdminHeader>
      <AdminLayout>{layout}</AdminLayout>
    </Admin>
  );
}
