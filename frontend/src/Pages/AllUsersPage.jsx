import User from "../Components/User/User";
import authService from "../Services/auth.service";
import userService from "../Services/user.service";
import { useState, useEffect } from "react";
function AllUsersPage() {
    const [users, setUsers] = useState([]);
    const currentUser = authService.getCurrentUser();

    useEffect(() => {
        fetchAccount();
    }, []);

    function fetchAccount() {
        userService.getAllUsers()
            .then(response => {
                const filteredUsers = response.filter(user => user.username !== currentUser.username);
                setUsers(filteredUsers);
            });
    }

    if (users.length === 0) {
        return <p>No users to display</p>;
    }
    
        return (
            <>
                <h1>All Users</h1>
                {users.map(user => (
                    <User key={user.accountId} user={user} />
                ))}
            </>
        );
}
export default AllUsersPage;