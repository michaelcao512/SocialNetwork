import React, { useEffect, useState, useCallback } from 'react';
import {  Typography, List, ListItem } from '@mui/material';
import authService from '../Services/auth.service';
import userService from '../Services/user.service';
import User from '../Components/User/User';
import { StandardContainer, StyledStack } from '../StyledComponents/StyledComponents';

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
            <StyledStack>
                <Typography variant="h4" gutterBottom>
                    All Users
                </Typography>
                <Typography variant="body1" align="center">
                    No users to display
                </Typography>
            </StyledStack>
        );
    }

    return (
        <StyledStack>
            <Typography variant="h4" gutterBottom>
                All Users
            </Typography>
            <StandardContainer>
                    <List>
                        {users.map(user => (
                            <ListItem key={user.accountId}>
                                <User user={user} />
                            </ListItem>
                        ))}
                    </List>
            </StandardContainer>
        </StyledStack>

    );
}

export default AllUsersPage;