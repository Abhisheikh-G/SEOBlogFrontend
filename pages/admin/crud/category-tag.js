import { useState } from "react";
import AdminLayout from "../../../components/Auth/AdminLayout";
import Category from "../../../components/CRUD/Category";
import Tag from "../../../components/CRUD/Tag";
import {
  Grid,
  Box,
  Toolbar,
  Button,
  Typography,
  Container,
} from "@material-ui/core";

const useModal = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return { open, handleClickOpen, handleClose };
};

export default function AdminCategoryManager() {
  const categoryModal = useModal();
  const tagModal = useModal();

  const layout = (
    <React.Fragment>
      <Container>
        <Grid container spacing={4}>
          <Grid item md={6}>
            <Typography variant="h5">Manage Categories</Typography>
            <Toolbar>
              <Button
                variant="outlined"
                color="primary"
                onClick={categoryModal.handleClickOpen}
                disableRipple
              >
                Create New Category
              </Button>
            </Toolbar>
            <Box mb={1} />
            <Category
              handleClose={categoryModal.handleClose}
              open={categoryModal.open}
            />
          </Grid>

          <Grid item md={6}>
            <Typography variant="h5">Tags</Typography>
            <Toolbar>
              <Button
                variant="outlined"
                color="primary"
                onClick={tagModal.handleClickOpen}
                disableRipple
              >
                Create New Tag
              </Button>
            </Toolbar>
            <Box mb={1} />
            <Tag handleClose={tagModal.handleClose} open={tagModal.open} />
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
