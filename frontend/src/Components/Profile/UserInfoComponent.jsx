import Friendship from "./Friendship/Friendship";

function UserInfoComponent(props) {
    const { user, userInfo, profileId } = props;
    
    return ( 
        <>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>First Name: {userInfo.firstName}</p>
            <p>Last Name: {userInfo.lastName}</p>
            <p>Gender: {userInfo.gender}</p>
            <Friendship user={user} profileId={profileId}/>

        </>
     );
}


export default UserInfoComponent;