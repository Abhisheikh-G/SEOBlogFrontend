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
import User from "./User";
import { useLinkDisable } from "../../actions/hooks";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function UserMenu() {
  const router = useRouter();
  const categoryTagLink = useLinkDisable(
    router.pathname,
    "/user/crud/category-tag"
  );
  const blogLink = useLinkDisable(router.pathname, "/user/crud/create");
  const profileLink = useLinkDisable(router.pathname, "/user/update");

  return (
    <React.Fragment>
      <User>
        <List component="nav" aria-label="main folders">
          <ListItem
            button
            disabled={categoryTagLink.isDisabled}
            onClick={() => router.push(`/user/crud/category-tag`)}
          >
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Categories And Tags" />
          </ListItem>
          <ListItem
            button
            disabled={blogLink.isDisabled}
            onClick={() => router.push(`/user/crud/create`)}
          >
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Blogs" />
          </ListItem>
          <ListItem
            button
            disabled={profileLink.isDisabled}
            onClick={() => router.push(`/user/update`)}
          >
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Update Profile" />
          </ListItem>
        </List>
        <Divider />
        {/* <List component="nav" aria-label="secondary mailbox folders">
            <ListItem button>
              <ListItemText primary="Trash" />
            </ListItem>
            <ListItemLink href="#simple-list">
              <ListItemText primary="Spam" />
            </ListItemLink>
          </List> */}
      </User>
    </React.Fragment>
  );
}
