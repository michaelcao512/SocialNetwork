
import { Box, Button, FormControl, FormLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import authService from '../../Services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import userService from '../../Services/user.service';

function RegistrationForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    
    useEffect(() => {
        // button disabled if any required fields not there
        // or email or username is invalid
        setButtonDisabled(
            email.length == 0 ||
            password.length == 0 ||
            username.length == 0 ||
            firstName.length == 0 ||
            emailError ||
            usernameError
        );
    }, [emailError, usernameError, email, password, username, firstName]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const registrationRequest = {
            email: email,
            password: password,
            username: username,
            firstName: firstName,
            lastName: lastName,
            gender: gender
        };

        authService.register(registrationRequest)
            .then(response => {
                console.log("registration response: ", response);
                authService.login({ username: username, password: password })
                    .then(response => {
                        console.log("login response: ", response);
                        navigate(`/profile/${response.id}`);
                    })
                    .catch(error => {
                        console.log("login error: ", error);
                    });
            })
            .catch(error => {
                console.log("registration error: ", error);
            });
    };


    const handleEmailValidation = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            setEmailErrorMessage('Invalid email format');
        }
        
        userService.checkEmailExists(email)
            .then(response => {

                if (response) {
                    setEmailError(true);
                    setEmailErrorMessage('Email already exists');
                } else {
                    setEmailError(false);
                    setEmailErrorMessage('');
                }
            })
            .catch(error => {
                console.log("error: ", error);
            })
    };

    const hadnleUsernameValidation = (username) => {
        userService.checkUsernameExists(username)
            .then(response => {
                if (response) {
                    setUsernameError(true);
                    setUsernameErrorMessage('Username already exists');
                } else {
                    setUsernameError(false);
                    setUsernameErrorMessage('');
                }
            })
            .catch(error => {
                console.log("error: ", error);
            }); 
        
    };

    return ( 
        <Box component="form" onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', maxWidth: '400px', margin: 'auto' }}>
            
            <FormControl>
                <FormLabel htmlFor="email">Email*</FormLabel>
                <TextField
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    fullWidth
                    placeholder="your@email.com"
                    size="small"
                    value={email}
                    error={emailError}
                    helperText={emailErrorMessage}
                    onBlur={(event) => handleEmailValidation(event.target.value)}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="password">Password <RequiredField /></FormLabel>
                <TextField
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    fullWidth
                    placeholder="password"
                    size="small"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
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
                    onBlur={(event) => hadnleUsernameValidation(event.target.value)}
                    onChange={(event) => setUsername(event.target.value)}
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
                    onChange={(event) => setFirstName(event.target.value)}
                />  
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <TextField  
                    id="lastName"
                    name="lastName"
                    type="text"
                    fullWidth
                    placeholder="Last Name"
                    size="small"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="gender">Gender</FormLabel>
                <Select 
                    id="gender"
                    name="gender"
                    fullWidth
                    size="small"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
            </FormControl>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={buttonDisabled}
            >Register</Button>
        </Box>
     );
}

export default RegistrationForm;