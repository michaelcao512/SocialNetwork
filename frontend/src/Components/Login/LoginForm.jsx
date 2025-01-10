import { Box, Button, FormControl, FormLabel, TextField } from "@mui/material";
import authService from "../../Services/auth.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
function LoginForm() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const loginRequest = {
            username: username,
            password: password,
        };

        authService
            .login(loginRequest)
            .then((response) => {
                console.log("login response: ", response);
                navigate(`/feed`);
            })
            .catch((error) => {
                console.log("login error: ", error);
            });
    };
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%", maxWidth: "400px", margin: "auto" }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PersonIcon fontSize="small" />
                <FormControl sx={{ flex: 1 }}>
                    <TextField
                        label="Username"
                        id="username"
                        name="username"
                        type="text"
                        required
                        fullWidth
                        placeholder="Username"
                        size="small"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LockIcon />
                <FormControl sx={{ flex: 1 }}>
                    <TextField
                        label="Password"
                        id="password"
                        name="password"
                        type="password"
                        required
                        fullWidth
                        placeholder="Password"
                        size="small"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </FormControl>
            </Box>

            <Button type="submit" variant="contained" color="primary" sx={{ width: "60%", alignSelf: "center", mt: 1 }}>
                Log in
            </Button>
        </Box>
    );
}

export default LoginForm;
