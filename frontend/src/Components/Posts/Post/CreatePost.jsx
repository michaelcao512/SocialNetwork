import { FormControl, TextField} from "@mui/material";
import { useState } from "react";
import postService from "../../../Services/post.service";
import { StyledButton, StandardContainer } from "../../../StyledComponents/StyledComponents";


function CreatePost(props) {
    const { user, onPostCreated } = props;
    const [content, setContent] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setContent("");
        
        try {
            await postService.createPost(content, user.id);
            onPostCreated();
        } catch (error) {
            console.log("createPost error: ", error);
        }
    };

    return ( 
        <StandardContainer component="form" onSubmit={handleSubmit} >
            <FormControl fullWidth>
                <TextField
                    label="Content"
                    multiline
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </FormControl>

            <StyledButton
                type="submit" variant="contained" color="primary">Create Post</StyledButton>
        </StandardContainer>
     );
}

export default CreatePost;