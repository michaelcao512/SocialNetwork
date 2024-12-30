import React from 'react';
import { Box, Typography,Divider  } from '@mui/material';

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
                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                            {user.username}
                        </Typography>
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
