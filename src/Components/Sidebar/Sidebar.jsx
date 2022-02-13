import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside id="sidebar">
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <DashboardIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton className="active">
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <WorkIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Jobs" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <GroupIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Candidates" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <SettingsIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <InfoIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Help" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    </aside>
  );
};

export default Sidebar;
