import {
  Avatar,
  Divider,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink } from "react-router-dom";
import "./Header.css";
import { getRequestedData } from "../../services/getRequestData";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const picUrl = "https://randomuser.me/api/?inc=picture";
  const [profilePic, setProfilePic] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getRequestedData(picUrl).then(({ results }) => {
      setProfilePic(results[0].picture.medium);
    });
  }, []);

  return (
    <header>
      <Link underline="none" component={RouterLink} to="/">
        <h1 className="brand">AtS Board</h1>
      </Link>
      <div className="header-right-menu">
        <Button variant="contained" startIcon={<AddIcon />} size="large">
          Create new job
        </Button>
        <div className="profile-menu">
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Avatar alt="admin" src={profilePic} />
            <Button
              id="profileBtn"
              className="profile-menu-button"
              aria-controls={open ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="text"
              size="large"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Admin
            </Button>
          </Box>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
