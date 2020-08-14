import React from "react";
import AdminLayout from "../../../components/Auth/AdminLayout";
import Category from "../../../components/CRUD/Category";
import {
  Grid,
  Box,
  Toolbar,
  Button,
  Divider,
  Typography,
  Container,
} from "@material-ui/core";

export default function AdminCategoryManager() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const layout = (
    <React.Fragment>
      <Container>
        <Grid container>
          <Grid item md={6}>
            <Typography variant="h5">Manage Categories</Typography>
            <Toolbar>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
              >
                Create New Category
              </Button>
            </Toolbar>

            <Box mb={1} />
            <Category handleClose={handleClose} open={open} />
          </Grid>
          <Grid item md={6}>
            <Typography variant="h5">Tags</Typography>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );

  return (
    <AdminLayout headerMessage={"Manage Categories And Tags"}>
      {layout}
    </AdminLayout>
  );
}
