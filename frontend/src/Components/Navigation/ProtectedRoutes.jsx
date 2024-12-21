
import AuthService from "../../Services/auth.service";
import { Outlet, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
function ProtectedRoutes() {
    const user = AuthService.getCurrentUser(); 
    return user ?
        <>
            <NavBar />
            <Outlet />
        </>
        : <Navigate to="/" />;
}

export default ProtectedRoutes;