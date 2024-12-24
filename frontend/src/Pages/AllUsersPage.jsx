import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import styled from '@emotion/styled';
import authService from '../Services/auth.service';
import userService from '../Services/user.service';
import User from '../Components/User/User';
import { StandardContainer } from '../StyledComponents/StyledComponents';


const UsersContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '800px',
    margin: 'auto',
}));

function AllUsersPage() {
    const [users, setUsers] = useState([]);
    const currentUser = authService.getCurrentUser();

    const fetchAccount = useCallback(() => {
        userService.getAllUsers()
            .then(response => {
                const filteredUsers = response.filter(user => user.username !== currentUser.username);
                setUsers(filteredUsers);
            });
    }, [currentUser.username]);

    useEffect(() => {
        fetchAccount();
    }, [fetchAccount]);

    if (users.length === 0) {
        return (
            <StandardContainer>
                <Typography variant="body1" align="center">
                    No users to display
                </Typography>
            </StandardContainer>
        );
    }

    return (
        <StandardContainer>
            <Typography variant="h4" gutterBottom>
                All Users
            </Typography>
            <UsersContainer>
                <List>
                    {users.map(user => (
                        <ListItem key={user.accountId}>
                            <User user={user} />
                        </ListItem>
                    ))}
                </List>
            </UsersContainer>
        </StandardContainer>
    );
}

export default AllUsersPage;