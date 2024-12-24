import { Typography } from "@mui/material";
import { StyledLink } from "../../StyledComponents/StyledComponents";

function User(props) {
    const { user } = props;
    console.log("user"  , user);
    return ( 
        <>
            <StyledLink destination={`/profile/${user.accountId}`} text={user.username}/>
            <Typography variant="body1" align="center" gutterBottom> {user.userInfo.firstName} {user.userInfo.lastName} </Typography> 
        </>
     );
}

export default User;