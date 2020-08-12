import { Grid, Box, Container } from "@material-ui/core";
import AdminMenu from "./AdminMenu";

export default function AdminLayout({ children }) {
  return (
    <Container maxWidth="xl">
      <Grid item container>
        <Grid item md={2}>
          <AdminMenu />
        </Grid>
        <Grid item md={10}>
          <Box>{children}</Box>
        </Grid>
      </Grid>
    </Container>
  );
}
