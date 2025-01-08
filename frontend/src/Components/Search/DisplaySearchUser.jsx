import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    '&:hover': {
        textDecoration: 'underline',
        color: theme.palette.primary.dark,
    },
}));

function DisplaySearchUser({ users, error }) {
    return (
        <Box>
            {error && (
                <Typography style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>
                    {error}
                </Typography>
            )}

            {users.length > 0 ? (
                users.map((user) => (
                    <Box
                        key={user.accountId}
                        style={{
                            border: '1px solid #ccc',
                            padding: '1rem',
                            marginBottom: '1rem',
                            borderRadius: '8px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        }}
                    >
                        <StyledNavLink to={`/profile/${user.accountId}`}>
                            <Typography variant="h6">{user.username}</Typography>
                        </StyledNavLink>
                        <Typography variant="body1">
                            Name: {user.userInfo.firstName} {user.userInfo.lastName}
                        </Typography>
                        <Typography variant="body2" style={{ marginTop: '5px' }}>
                            Email: {user.email}
                        </Typography>
                        <Typography variant="body2" style={{ marginTop: '5px' }}>
                            Gender: {user.userInfo.gender}
                        </Typography>
                        <Typography variant="body2" style={{ marginTop: '5px' }}>
                            Biography: {user.userInfo.biography}
                        </Typography>

                        <Divider style={{ margin: '1rem 0' }} />

                        <Typography variant="body2">
                            Following: {user.following.length} users
                        </Typography>
                        <Typography variant="body2">
                            Followers: {user.followers.length} users
                        </Typography>
                        <Typography variant="body2">
                            Total Posts: {user.posts.length}
                        </Typography>
                    </Box>
                ))
            ) : (
                !error && (
                    <Typography style={{ textAlign: 'center', marginTop: '2rem' }}>
                        No users found. Try a different query.
                    </Typography>
                )
            )}
        </Box>
    );
}

export default DisplaySearchUser;