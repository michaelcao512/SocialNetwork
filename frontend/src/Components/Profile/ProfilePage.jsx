import { useEffect, useState } from "react";

import userInfoService from "../../Services/userinfo.service";
import authService from "../../Services/auth.service";

import UserInfoComponent from "./UserInfoComponent";

function ProfilePage() {
    const user = authService.getCurrentUser();
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        userInfoService.getUserInfoById(user.id)
            .then(response => {
                console.log("response: ", response);
                setUserInfo(response);
            }).catch(error => {
                console.log("error: ", error);
            });
    }, []);


    return ( 
        <>
            <h1>Profile Page</h1>
            <UserInfoComponent user={user} userInfo={userInfo}/>
        </>
     );
}

export default ProfilePage;