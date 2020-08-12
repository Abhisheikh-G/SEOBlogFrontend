import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DraftsIcon from "@material-ui/icons/Drafts";
import { useRouter } from "next/router";
import Admin from "./Admin";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function AdminMenu() {
  const router = useRouter();
  return (
    <React.Fragment>
      <Admin>
        <List component="nav" aria-label="main folders">
          <ListItem
            button
            onClick={() => router.push(`${router.pathname}/crud/category-tag`)}
          >
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Create Category" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem button>
            <ListItemText primary="Trash" />
          </ListItem>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Spam" />
          </ListItemLink>
        </List>
      </Admin>
    </React.Fragment>
  );
}
