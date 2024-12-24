import React from 'react';
import { Box, Typography } from '@mui/material';
import { StyledCard, StyledLink, StyledStack } from "../../StyledComponents/StyledComponents";
import RegistrationForm from "./RegistrationForm";

function RegistrationContainer() {
    return (
        <StyledStack>
            <StyledCard>
                <Typography variant="h3" gutterBottom>
                    Registration Page
                </Typography>
                <RegistrationForm />
                <Box sx={{ marginTop: '1rem' }}>
                    <StyledLink destination="/login" text="Login" />
                </Box>
            </StyledCard>
        </StyledStack>
    );
}

export default RegistrationContainer;