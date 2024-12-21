
import { Box, Button, FormControl, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import authService from '../../Services/auth.service';
import { useNavigate } from 'react-router-dom';
function LoginForm() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);

        const username = formData.get('username');
        const password = formData.get('password');

        const loginRequest = {
            username: username,
            password: password,
        };

        authService.login(loginRequest)
            .then(response => {
                console.log("login response: ", response);
                        navigate("/profile");
            })
            .catch(error => {
                console.log("login error: ", error);
            });
    
        
    };
    return ( 
        <Box component="form" onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', maxWidth: '400px', margin: 'auto' }}>
            
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

            <Button type="submit" variant="contained" color="primary">Log in</Button>
        </Box>
     );
}

export default LoginForm;