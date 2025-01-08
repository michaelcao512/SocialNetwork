import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Box, Typography, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import styled from '@emotion/styled';
import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from "./LogoutButton";
import authService from "../../Services/auth.service";
import { StyledNavLink } from '../../StyledComponents/StyledComponents';

const drawerWidth = 240;

const NavBarContainer = styled(Box)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
}));

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
            <Box sx={{ padding: '1rem' }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 'bold',
                        color: '#1976d2',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    Connect.
                </Typography>
            </Box>
            <List>
                <ListItem
                    component={StyledNavLink}
                    to={ownProfile}
                    className={location.pathname === ownProfile ? 'active' : ''}
                    onClick={handleDrawerToggle} // Close drawer after clicking
                >
                    <ListItemText primary="My Profile" />
                </ListItem>
                <ListItem
                    component={StyledNavLink}
                    to="/allposts"
                    className={location.pathname === '/allposts' ? 'active' : ''}
                    onClick={handleDrawerToggle}
                >
                    <ListItemText primary="All Posts" />
                </ListItem>
                <ListItem
                    component={StyledNavLink}
                    to="/allusers"
                    className={location.pathname === '/allusers' ? 'active' : ''}
                    onClick={handleDrawerToggle}
                >
                    <ListItemText primary="All Users" />
                </ListItem>
                <ListItem
                    component={StyledNavLink}
                    to="/search"
                    className={location.pathname === '/search' ? 'active' : ''}
                    onClick={handleDrawerToggle}
                >
                    <ListItemText primary="Search" />
                </ListItem>
                <ListItem>
                    <LogoutButton />
                </ListItem>
            </List>
        </div>
    );

    return (
        <>
            {!isDrawerOpen && ( // Hide the button when the Drawer is open
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{
                        position: 'fixed',
                        top: '1rem',
                        left: '1rem',
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
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        zIndex: 1400,
                    },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
}

export default NavBar;