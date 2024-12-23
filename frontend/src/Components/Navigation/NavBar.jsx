import LogoutButton from "./LogoutButton";
import { StyledLink } from "../../StyledComponents/StyledComponents";
import authService from "../../Services/auth.service";
function NavBar() {
    const user = authService.getCurrentUser();
    const ownProfile = `/profile/${user.id}`
    return (
        <>
            <StyledLink destination="/allposts" text="All Posts"/>
            <StyledLink destination={ownProfile} text="My Profile" />
            <StyledLink destination="/allusers" text="All Users" />
            <LogoutButton/>
        </>
    );
}

export default NavBar;