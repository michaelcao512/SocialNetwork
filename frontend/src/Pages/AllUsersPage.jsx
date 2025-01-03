import React, { useEffect, useState, useCallback } from 'react';
import {  Typography, List, ListItem } from '@mui/material';
import authService from '../Services/auth.service';
import userService from '../Services/user.service';
import User from '../Components/Profile/User/User';
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
        <StyledStack 
        style={{ backgroundColor: "#ffffff",boxShadow: "none" ,textAlign: "left",alignItems: "flex-start",padding: "1rem",}}>
            <Typography variant="h4" gutterBottom 
            style={{ textAlign: "left", width: "100%" }}>
                All Users
            </Typography>
            <StandardContainer 
            style={{ backgroundColor: "#ffffff",boxShadow: "none", textAlign: "left",width: "100%",}}>
                    <List 
                    style={{ width: "100%",padding: 0 }}>
                        {users.map(user => (
                            <ListItem key={user.accountId} 
                                style={{ display: "flex",justifyContent: "flex-start",textAlign: "left", alignItems: "center",
                                justifyContent: "flex-start", padding: "0.5rem 0",width: "100%",}}>
                                <User user={user} />
                            </ListItem>
                        ))}
                    </List>
            </StandardContainer>
        </StyledStack>

    );
}

export default AllUsersPage;