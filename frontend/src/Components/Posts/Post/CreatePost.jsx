import { Box, Button, FormControl, TextField} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import postService from "../../../Services/post.service";

function CreatePost(props) {
    const { accountId, onPostCreated } = props;
    const navigate = useNavigate();
    const [content, setContent] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setContent("");
        
        try {
            const response = await postService.createPost(content, accountId);
            onPostCreated();
        } catch (error) {
            console.log("createPost error: ", error);
        }
    };

    return ( 
        <Box component="form" onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', maxWidth: '400px', margin: 'auto' }}>

            <FormControl>
                <TextField
                    label="Content"
                    multiline
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </FormControl>

            <Button type="submit" variant="contained" color="primary">Create Post</Button>
        </Box>
     );
}

export default CreatePost;