function UserInfoComponent(props) {
    const { user, userInfo } = props;
    return ( 
        <>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>First Name: {userInfo.firstName}</p>
            <p>Last Name: {userInfo.lastName}</p>
            <p>Gender: {userInfo.gender}</p>
        </>
     );
}


export default UserInfoComponent;