import { StyledLink } from "../../StyledComponents/StyledComponents";

function User(props) {
    const { user } = props;

    return ( 
        <>
            <StyledLink destination={`/profile/${user.accountId}`} text={user.username}/>
            <p>{user.email}</p>
            <hr/>
        </>
     );
}

export default User;