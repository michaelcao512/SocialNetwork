import AuthService from "../../Services/auth.service";
import { StyledLink } from "../../StyledComponents/StyledComponents";
import axios from "axios";
function HomePage() {


    return ( 
        <main className="home-page">
            <h1>Home Page</h1>
            <StyledLink destination="/register" text="Register" />
            <StyledLink destination="/login" text="Login" />

        </main>
     );
}

export default HomePage;