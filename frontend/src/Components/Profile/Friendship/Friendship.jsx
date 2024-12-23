import { useState, useEffect, useCallback } from "react";
import userService from "../../../Services/user.service";
import friendshipService from "../../../Services/friendship.service";
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
        <>
            
            <div>
                 <h3>Following {following.length}</h3>
                {following.map(following => (
                    <p key={following.accountId}>{following.username} </p>
                ))}
            </div>
          

            <div>
                <h3>Followers {followers.length}</h3>
                {followers.map(followers => (
                    <p key={followers.accountId}>{followers.username} </p>
                ))}
            </div>
                    
            {canFollow && <button onClick={followHandler}>Follow</button>}
            {canUnfollow && <button onClick={unfollowHandler}>Unfollow</button>}
        </>
     );
}

export default Friendship;