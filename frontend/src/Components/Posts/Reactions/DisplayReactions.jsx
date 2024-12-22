import { useState, useEffect } from "react";
import reactionsService from "../../../Services/reactions.service";
import { Button } from "@mui/material";



function DisplayReactions(props) {
    const { post, accountId } = props
    const postId = post.postId;
    const [numLikes, setNumLikes] = useState(0);
    const [numDislikes, setNumDislikes] = useState(0);

    const [reaction, setReaction] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        reactionsService.getLikeCountByPostId(postId)
        .then(response => {
            setNumLikes(response);
        });
        reactionsService.getDislikeCountByPostId(postId)
        .then(response => {
            setNumDislikes(response);
        });
        reactionsService.getReactionsByPostId(postId, accountId)
        .then(response => {
            setReaction(response);
        })
    }

    function handleLikeClick() {
        console.log(reaction);
        if (reaction != null && reaction.reactionType == "LIKE") {
            reactionsService.deleteReaction(reaction.reactionId)
            .then(response => {
                fetchData()
            });
        } else {
            reactionsService.createReaction("LIKE", postId, accountId)
                .then(response => {
                
                fetchData()
            });
        }
    }
    function handleDislikeClick() {
        if (reaction != null && reaction.reactionType == "DISLIKE") {
            reactionsService.deleteReaction(reaction.reactionId)
            .then(response => {
                fetchData()
            });
        } else {
            reactionsService.createReaction("DISLIKE", postId, accountId)
            .then(response => {
                fetchData()
            });
        }
    }
    return ( 
        <>
            <span>
                <Button onClick={handleLikeClick}>Like</Button>: {numLikes}
                <Button onClick={handleDislikeClick}>Dislike</Button>: {numDislikes}
            </span>
        </>
     );
}

export default DisplayReactions;