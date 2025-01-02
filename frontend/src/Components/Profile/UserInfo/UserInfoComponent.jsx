import React from 'react';
import { Typography } from '@mui/material';
import Friendship from '../Friendship/Friendship';
import { StandardContainer } from '../../../StyledComponents/StyledComponents';



const UserInfoComponent = (props) => {
    const { user, userInfo, profileId } = props;

    return (
        <StandardContainer style={{ backgroundColor: "#f4f9fd",border: "none" ,boxShadow: "none"}}
            sx={{
                textAlign: 'center',
                padding: '20px',
                marginBottom: '20px',
                border: "none"
            }}>
            <Typography variant="h5" >
                {userInfo.firstName} {userInfo.lastName}
            </Typography>
            <Typography variant="body1" gutterBottom>
                @{user.username}
            </Typography>

            <Typography variant="body1" gutterBottom>
                {userInfo.biography}
            </Typography>

            <Friendship user={user} profileId={profileId} />
        </StandardContainer>
    );
};

export default UserInfoComponent;