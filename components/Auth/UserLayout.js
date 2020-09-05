import { Grid, Box, Container } from "@material-ui/core";
import UserMenu from "./UserMenu";
import UserHeader from "./UserHeader";
import User from "./User";

export default function UserLayout(props) {
  return (
    <React.Fragment>
      <User>
        <UserHeader headerMessage={props.headerMessage} />
        <Container maxWidth="xl">
          <Grid item container>
            <Grid item md={2}>
              <UserMenu />
            </Grid>
            <Grid item md={10}>
              <Box>{props.children}</Box>
            </Grid>
          </Grid>
        </Container>
      </User>
    </React.Fragment>
  );
}
