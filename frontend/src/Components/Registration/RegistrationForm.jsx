
import { Box, Button, FormControl, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import authService from '../../Services/auth.service';
import { useNavigate } from 'react-router-dom';
function RegistrationForm() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);

        const email = formData.get('email');
        const password = formData.get('password');
        const username = formData.get('username');
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const gender = formData.get('gender');

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