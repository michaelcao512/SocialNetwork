
import { Box, Button, FormControl, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import authService from '../../Services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function RegistrationForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
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
    return ( 
        <Box component="form" onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', maxWidth: '400px', margin: 'auto' }}>
            
            <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
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
                    onChange={(event) => setEmail(event.target.value)}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
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
                <FormLabel htmlFor="username">Username</FormLabel>
                <TextField  
                    id="username"
                    name="username"
                    type="text"
                    required
                    fullWidth
                    placeholder="username"
                    size="small"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />  
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
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
                    required
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
                    required
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

            <Button type="submit" variant="contained" color="primary">Register</Button>
        </Box>
     );
}

export default RegistrationForm;