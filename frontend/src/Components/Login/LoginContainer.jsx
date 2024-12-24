import { Typography, Box } from "@mui/material";
import { StyledCard, StyledStack, StyledLink} from "../../StyledComponents/StyledComponents";
import LoginForm from "./LoginForm";
function LoginContainer() {

    return ( 
        <StyledStack>
            <StyledCard>
                <Typography variant="h3">Login Page</Typography>
                <LoginForm />
                <Box sx={{marginTop: '1rem' }} >
                    {/* <StyledLink destination="/" text="Home"/> */}
                    <StyledLink destination="/register" text="Register" />
                </Box>
            </StyledCard>
        </StyledStack>
     );
}

export default LoginContainer;