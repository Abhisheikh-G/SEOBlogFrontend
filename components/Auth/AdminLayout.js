import { Grid, Box, Container } from "@material-ui/core";
import AdminMenu from "./AdminMenu";
import AdminHeader from "./AdminHeader";
import Admin from "./Admin";

export default function AdminLayout(props) {
  return (
    <React.Fragment>
      <Admin>
        <AdminHeader headerMessage={props.headerMessage} />
        <Container maxWidth="xl">
          <Grid item container>
            <Grid item md={2}>
              <AdminMenu />
            </Grid>
            <Grid item md={10}>
              <Box>{props.children}</Box>
            </Grid>
          </Grid>
        </Container>
      </Admin>
    </React.Fragment>
  );
}
