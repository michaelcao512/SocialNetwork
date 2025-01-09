import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, FormControl, FormLabel, MenuItem, Select, TextField, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../../Services/auth.service';
import userService from '../../Services/user.service';

function RegistrationForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const emailTimeoutRef = useRef(null);
    const usernameTimeoutRef = useRef(null);

    useEffect(() => {
        setButtonDisabled(
            !email ||
            !password ||
            !confirmPassword ||
            !username ||
            !firstName ||
            !lastName ||
            !gender ||
            emailError ||
            usernameError ||
            passwordError ||
            password !== confirmPassword
        );
    }, [
        email,
        password,
        confirmPassword,
        username,
        firstName,
        lastName,
        gender,
        emailError,
        usernameError,
        passwordError,
    ]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const registrationRequest = {
            email,
            password,
            username,
            firstName,
            lastName,
            gender,
        };

        try {
            const response = await authService.register(registrationRequest);
            if (response.accountId) {
                navigate('/registration-confirmation');
            } else {
                alert(response.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert(
                error.response?.data?.message ||
                error.message ||
                'An unexpected error occurred. Please try again.'
            );
        }
    };

    const handleEmailValidation = (email) => {
        clearTimeout(emailTimeoutRef.current);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            setEmailErrorMessage('Invalid email format');
            return;
        }

        emailTimeoutRef.current = setTimeout(async () => {
            try {
                const exists = await userService.checkEmailExists(email);
                if (exists) {
                    setEmailError(true);
                    setEmailErrorMessage('Email already exists');
                } else {
                    setEmailError(false);
                    setEmailErrorMessage('');
                }
            } catch (error) {
                console.error('Error checking email:', error);
                setEmailError(true);
                setEmailErrorMessage('Unable to validate email');
            }
        }, 500);
    };

    const handleUsernameValidation = (username) => {
        clearTimeout(usernameTimeoutRef.current);

        usernameTimeoutRef.current = setTimeout(async () => {
            try {
                const exists = await userService.checkUsernameExists(username);
                if (exists) {
                    setUsernameError(true);
                    setUsernameErrorMessage('Username not available');
                } else {
                    setUsernameError(false);
                    setUsernameErrorMessage('');
                }
            } catch (error) {
                console.error('Error checking username:', error);
                setUsernameError(true);
                setUsernameErrorMessage('Unable to validate username');
            }
        }, 500);
    };

    const handlePasswordValidation = (password) => {
        if (password.length < 8) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 8 characters long');
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                width: '100%',
                maxWidth: '400px',
                margin: 'auto',
            }}
        >
            <FormControl>
                <FormLabel htmlFor="email">Email *</FormLabel>
                <TextField
                    id="email"
                    name="email"
                    type="email"
                    required
                    fullWidth
                    placeholder="your@email.com"
                    size="small"
                    value={email}
                    error={emailError}
                    helperText={emailErrorMessage}
                    onBlur={(e) => handleEmailValidation(e.target.value)}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="password">Password *</FormLabel>
                <TextField
                    id="password"
                    name="password"
                    type="password"
                    required
                    fullWidth
                    placeholder="password"
                    size="small"
                    value={password}
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        handlePasswordValidation(e.target.value);
                    }}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="confirmPassword">Confirm Password *</FormLabel>
                <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    fullWidth
                    placeholder="Confirm Password"
                    size="small"
                    value={confirmPassword}
                    error={password !== confirmPassword}
                    helperText={password !== confirmPassword ? 'Passwords do not match' : ''}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="username">Username *</FormLabel>
                <TextField
                    id="username"
                    name="username"
                    type="text"
                    required
                    fullWidth
                    placeholder="username"
                    size="small"
                    value={username}
                    error={usernameError}
                    helperText={usernameErrorMessage}
                    onBlur={(e) => handleUsernameValidation(e.target.value)}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="firstName">First Name *</FormLabel>
                <TextField
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    fullWidth
                    placeholder="First Name"
                    size="small"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="lastName">Last Name *</FormLabel>
                <TextField
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    fullWidth
                    placeholder="Last Name"
                    size="small"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="gender">Gender *</FormLabel>
                <Select
                    id="gender"
                    name="gender"
                    required
                    fullWidth
                    size="small"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="primary" disabled={buttonDisabled}>
                Register
            </Button>
        </Box>
    );
}

export default RegistrationForm;