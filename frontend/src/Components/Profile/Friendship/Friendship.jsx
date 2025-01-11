import { useState, useEffect, useCallback } from "react";
import userService from "../../../Services/user.service";
import friendshipService from "../../../Services/friendship.service";
import { StyledButton } from "../../../StyledComponents/StyledComponents";
import { Typography, Box, Dialog, Tab, List, ListItemText, ListItem, Tabs, DialogContent, DialogTitle, Avatar } from "@mui/material";
import { NavLink } from "react-router-dom";
function Friendship(props) {
    const { user, profileId } = props;
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);

    const [canFollow, setCanFollow] = useState(false);
    const [canUnfollow, setCanUnfollow] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const s3BucketUrl = import.meta.env.VITE_BASE_S3_BUCKET_URL;

    const fetchFollowing = useCallback(async () => {
        try {
            const response = await userService.getFollowing(profileId);
            const followingWithAvatars = await Promise.all(
                response.map(async (follow) => {
                    try {
                        const userInfo = await userInfoService.getUserInfoByAccountId(follow.accountId);
                        return {
                            ...follow,
                            avatarUrl: userInfo.avatarUrl || null,
                        };
                    } catch (error) {
                        console.error("Error fetching avatar for user:", follow.accountId);
                        return {
                            ...follow,
                            avatarUrl: null,
                        };
                    }
                })
            );
            setFollowing(followingWithAvatars);
        } catch (error) {
            console.error("Error fetching following:", error);
        }
    }, [profileId]);
    

    const fetchFollowers = useCallback(async () => {
        try {
            const response = await userService.getFollowers(profileId);
            const followersWithAvatars = await Promise.all(
                response.map(async (follower) => {
                    try {
                        // Fetch avatar from userInfo service
                        const userInfo = await userInfoService.getUserInfoByAccountId(follower.accountId);
                        return {
                            ...follower, // Keep existing follower data (username, accountId, etc.)
                            avatarUrl: userInfo.avatarUrl || null, // Add avatarUrl
                        };
                    } catch (error) {
                        console.error("Error fetching avatar for user:", follower.accountId);
                        return {
                            ...follower,
                            avatarUrl: null, // Fallback to null if there's an error
                        };
                    }
                })
            );
            setFollowers(followersWithAvatars);
        } catch (error) {
            console.error("Error fetching followers:", error);
        }
    }, [profileId]);
    

    const fetchFriendship = useCallback(() => {
        fetchFollowing();
        fetchFollowers();
        if (user.id !== profileId) {
            friendshipService.canFollow(user.id, profileId).then((response) => {
                setCanFollow(response);
                setCanUnfollow(!response);
            });
        }
    }, [user.id, profileId, fetchFollowing, fetchFollowers]);

    useEffect(() => {
        setCanFollow(false);
        setCanUnfollow(false);
        fetchFriendship();
    }, [profileId, fetchFriendship]);

    const followHandler = useCallback(() => {
        friendshipService.follow(user.id, profileId).then((response) => {
            fetchFriendship();
        });
    }, [user.id, profileId, fetchFriendship]);

    const unfollowHandler = useCallback(() => {
        friendshipService.unfollow(user.id, profileId).then((response) => {
            fetchFriendship();
        });
    }, [user.id, profileId, fetchFriendship]);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleNavLinkClick = useCallback(() => {
        setOpenDialog(false);
        fetchFriendship();
    }, [fetchFriendship]);

    return (
        <Box>
            <Box
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <Typography
                    variant="body1"
                    style={{ margin: "10px", cursor: "pointer" }}
                    onClick={() => {
                        setOpenDialog(true);
                        setTabIndex(0);
                    }}
                >
                    Followers {followers.length}
                </Typography>
                <Typography
                    variant="body1"
                    style={{ margin: "10px", cursor: "pointer" }}
                    onClick={() => {
                        setOpenDialog(true);
                        setTabIndex(1);
                    }}
                >
                    Following {following.length}
                </Typography>
            </Box>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
                <DialogTitle>Followers and Following</DialogTitle>
                <Tabs value={tabIndex} onChange={handleTabChange} centered>
                    <Tab label={`Followers (${followers.length})`} />
                    <Tab label={`Following (${following.length})`} />
                </Tabs>
                <DialogContent>
    {tabIndex === 0 && (
        <List>
        {followers.map((follower) => (
          <ListItem
            key={follower.accountId}
            component={NavLink}
            to={`/profile/${follower.accountId}`}
            onClick={handleNavLinkClick}
          >
            <Avatar
              src={
                follower.userInfo?.avatarUrl
                  ? `${s3BucketUrl}${follower.userInfo.avatarUrl}`
                  : "/default-avatar.png"
              }
              alt={follower.username || "User Avatar"}
              sx={{ width: 40, height: 40, marginRight: "1rem" }}
            >
              {follower.userInfo?.firstName?.charAt(0) || "?"}
            </Avatar>
            <ListItemText primary={follower.username} />
          </ListItem>
        ))}
      </List>
      
    )}
    {tabIndex === 1 && (
       <List>
       {following.map((follow) => (
         <ListItem
           key={follow.accountId}
           component={NavLink}
           to={`/profile/${follow.accountId}`}
           onClick={handleNavLinkClick}
         >
           <Avatar
             src={
               follow.userInfo?.avatarUrl
                 ? `${s3BucketUrl}${follow.userInfo.avatarUrl}`
                 : "/default-avatar.png"
             }
             alt={follow.username || "User Avatar"}
             sx={{ width: 40, height: 40, marginRight: "1rem" }}
           >
             {follow.userInfo?.firstName?.charAt(0) || "?"}
           </Avatar>
           <ListItemText primary={follow.username} />
         </ListItem>
       ))}
     </List>
     
    )}
</DialogContent>


            </Dialog>
            <Box>
                {canFollow && (
                    <StyledButton variant="contained" color="primary" onClick={followHandler}>
                        Follow
                    </StyledButton>
                )}
                {canUnfollow && (
                    <StyledButton variant="contained" color="secondary" onClick={unfollowHandler}>
                        Unfollow
                    </StyledButton>
                )}
            </Box>
        </Box>
    );
}

export default Friendship;
