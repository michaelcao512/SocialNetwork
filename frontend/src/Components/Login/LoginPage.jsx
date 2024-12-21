import { StyledLink } from "../../StyledComponents/StyledComponents";
import LoginForm from "./LoginForm";

function LoginPage() {
    return (
        <main>
            <h1>Login Page</h1>

            <LoginForm />
            
            <StyledLink destination="/" text="Home" />
            <StyledLink destination="/register" text="Register" />
        </main>
      );
}

export default LoginPage;