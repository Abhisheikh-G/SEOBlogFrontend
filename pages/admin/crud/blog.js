import AdminLayout from "../../../components/Auth/AdminLayout";
import { useModal } from "../../../actions/hooks";
import {
  Grid,
  Box,
  Toolbar,
  Button,
  Typography,
  Container,
} from "@material-ui/core";
import BlogInterface from "../../../components/CRUD/BlogInterface";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getCookie, isAuth } from "../../../actions/auth";

export default function AdminManageBlog() {
  const router = useRouter();
  const blogModal = useModal();

  const layout = (
    <React.Fragment>
      <Container>
        <Grid container spacing={4}>
          <Grid item md={6}>
            <Typography variant="h5">Manage Blogs</Typography>
            <Toolbar>
              <Button
                variant="outlined"
                color="primary"
                onClick={blogModal.handleClickOpen}
                disableRipple
              >
                Create New Blog
              </Button>
            </Toolbar>
            <Box mb={1} />
            <BlogInterface
              open={blogModal.open}
              handleClose={blogModal.handleClose}
            />
          </Grid>

          <Grid item md={6}>
            <Typography variant="h5">Tags</Typography>
            <Toolbar>
              <Button
                variant="outlined"
                color="primary"
                onClick={blogModal.handleClickOpen}
                disableRipple
              >
                Create New Tag
              </Button>
            </Toolbar>
            <Box mb={1} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );

  return <AdminLayout headerMessage={"Manage Blogs"}>{layout}</AdminLayout>;
}
