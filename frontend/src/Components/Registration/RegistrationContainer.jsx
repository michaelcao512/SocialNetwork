import Typography  from "@mui/material/Typography";
import { StyledCard, StyledLink, StyledStack} from "../../StyledComponents/StyledComponents";
import RegistrationForm from "./RegistrationForm";
import { Box } from "@mui/material";
import UserService from "../../Services/user.service";

function RegistrationContainer() {

    return ( 
        <StyledStack>
            <StyledCard>
                <Typography variant="h3">Registration Page</Typography>
                <RegistrationForm />
                
                <Box sx={{}} >
                    <StyledLink destination="/" text="Home"/>
                    <StyledLink destination="/login" text="Login" />
                </Box>         
                
            </StyledCard>

        </StyledStack>
     );
}

export default RegistrationContainer;