import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Box, Typography, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import styled from '@emotion/styled';
import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from "./LogoutButton";
import authService from "../../Services/auth.service";

const drawerWidth = 180;

const NavBarContainer = styled(Box)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  '&.active > div': {
    backgroundColor: theme.palette.action.selected,
  },
}));

function NavBar() {
  const location = useLocation();
  const user = authService.getCurrentUser();
  const ownProfile = `/profile/${user.id}`;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Box sx={{ padding: '1rem' }}>
        <Typography variant="h6" noWrap>
          Navigation
        </Typography>
      </Box>
      <List>
        <ListItem button component={StyledNavLink} to={ownProfile} className={location.pathname === ownProfile ? 'active' : ''}>
          <ListItemText primary="My Profile" />
        </ListItem>
        <ListItem button component={StyledNavLink} to="/allposts" className={location.pathname === '/allposts' ? 'active' : ''}>
          <ListItemText primary="All Posts" />
        </ListItem>

        <ListItem button component={StyledNavLink} to="/allusers" className={location.pathname === '/allusers' ? 'active' : ''}>
          <ListItemText primary="All Users" />
        </ListItem>
        <ListItem>
          <LogoutButton />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <NavBarContainer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </NavBarContainer>
    </>
  );
}

export default NavBar;