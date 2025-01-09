import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Explore as ExploreIcon,
  People as PeopleIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import { NavLink, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import authService from "../../Services/auth.service";
import PropTypes from "prop-types"; // For type checking
import { StyledNavLink } from "../../StyledComponents/StyledComponents";

const drawerWidth = 240;

const NavBarContainer = styled(Box)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
}));

const NavItem = ({ to, icon: Icon, label, isActive, onClick }) => (
  <ListItem
    component={StyledNavLink}
    to={to}
    className={isActive ? "active" : ""}
    onClick={onClick}
    aria-current={isActive ? "page" : undefined}
  >
    <ListItemIcon
      sx={{
        minWidth: "36px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Icon fontSize="medium" />
    </ListItemIcon>
    <ListItemText
      primary={label}
      primaryTypographyProps={{
        fontSize: "1.2rem",
        lineHeight: "1.5",
        fontWeight: "bold",
      }}
      sx={{
        margin: 0,
        display: "flex",
        alignItems: "center",
      }}
    />
  </ListItem>
);

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

function NavBar() {
  const location = useLocation();
  const user = authService.getCurrentUser();
  const ownProfile = `/profile/${user.id}`;
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const drawer = (
    <div>
      <Box sx={{ padding: "1rem" }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: "bold",
            color: "primary.main",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          Connect.
        </Typography>
      </Box>
      <List>
        <NavItem
          to="/feed"
          icon={HomeIcon}
          label="Home"
          isActive={location.pathname === "/feed"}
          onClick={handleDrawerToggle}
        />
        <NavItem
          to="/search"
          icon={SearchIcon}
          label="Search"
          isActive={location.pathname === "/search"}
          onClick={handleDrawerToggle}
        />
        <NavItem
          to="/allposts"
          icon={ExploreIcon}
          label="Explore"
          isActive={location.pathname === "/allposts"}
          onClick={handleDrawerToggle}
        />
        <NavItem
          to="/allusers"
          icon={PeopleIcon}
          label="All Users"
          isActive={location.pathname === "/allusers"}
          onClick={handleDrawerToggle}
        />
        <NavItem
          to={ownProfile}
          icon={PersonIcon}
          label="My Profile"
          isActive={location.pathname === ownProfile}
          onClick={handleDrawerToggle}
        />
        <ListItem>
          <LogoutButton />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      {!isDrawerOpen && (
        <IconButton
          color="inherit"
          aria-label="open navigation drawer"
          aria-expanded={isDrawerOpen}
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
            zIndex: 1300,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant="temporary"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            zIndex: 1400,
            transition: "transform 0.3s ease", // Smooth transition
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default NavBar;
