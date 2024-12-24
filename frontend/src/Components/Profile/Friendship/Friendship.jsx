import { useState, useEffect, useCallback } from "react";
import userService from "../../../Services/user.service";
import friendshipService from "../../../Services/friendship.service";
import { StyledButton } from "../../../StyledComponents/StyledComponents";
import { Typography, Box } from "@mui/material";
function Friendship(props) {
    const { user, profileId } = props
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [canFollow, setCanFollow] = useState(false);
    const [canUnfollow, setCanUnfollow] = useState(false);


    const fetchFollowing = useCallback(() => {
        userService.getFollowing(profileId)
            .then(response => {
                setFollowing(response);
            });
    }, [profileId]);

    const fetchFollowers = useCallback(() => {
        userService.getFollowers(profileId)
            .then(response => {
                setFollowers(response);
            });
    }, [profileId]);

    const fetchFriendship = useCallback(() => {
        fetchFollowing();
        fetchFollowers();
        if (user.id !== profileId) {
            friendshipService.canFollow(user.id, profileId)
                .then(response => {
                    setCanFollow(response);
                    setCanUnfollow(!response);
                });
        }
    }, [user.id, profileId,fetchFollowing, fetchFollowers]);

    useEffect(() => {
        setCanFollow(false);
        setCanUnfollow(false);
        fetchFriendship();
    }, [profileId, fetchFriendship]);



    const followHandler = useCallback(() => {
        friendshipService.follow(user.id, profileId)
            .then(response => {
                fetchFriendship();
            });
    }, [user.id, profileId, fetchFriendship]);

    const unfollowHandler = useCallback(() => {
        friendshipService.unfollow(user.id, profileId)
            .then(response => {
                fetchFriendship();
            });
    }, [user.id, profileId, fetchFriendship]);


    return (
        <Box>
            <Box>
                <Typography variant="body1">Followers {followers.length}</Typography>
                {followers.map(follower => (
                    <Typography key={follower.accountId}>{follower.username}</Typography>
                ))}
                <Typography variant="body1">Following {following.length}</Typography>
                {following.map(follow => (
                    <Typography key={follow.accountId}>{follow.username}</Typography>
                ))}
            </Box>
            <Box>
                {canFollow && <StyledButton variant="contained" color="primary" onClick={followHandler}>Follow</StyledButton>}
                {canUnfollow && <StyledButton variant="contained" color="secondary" onClick={unfollowHandler}>Unfollow</StyledButton>}
            </Box>
        </Box>
    );
}

export default Friendship;