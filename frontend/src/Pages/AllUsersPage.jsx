import { useState, useEffect } from "react";
import { Typography, Grid, Card, CardContent, Avatar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import userService from "../Services/user.service";

function AllUsersPage() {
    const s3BucketUrl = import.meta.env.VITE_BASE_S3_BUCKET_URL;
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        userService.getAllUsers().then(setUsers).catch(console.error);
    }, []);

    return (
        <Box sx={{ padding: "1rem", maxWidth: "1200px", margin: "auto" }}>
            <Typography variant="h5" gutterBottom>
                Discover Users
            </Typography>
            {users.length === 0 ? (
                <Typography variant="body1" align="center">
                    No users to display.
                </Typography>
            ) : (
                <Grid container spacing={2}>
                    {users.map((user) => (
                        <Grid item xs={6} sm={4} md={3} key={user.accountId}>
                            <Card
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "1rem",
                                    cursor: "pointer",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    "&:hover": {
                                        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
                                        transform: "translateY(-5px)",
                                    },
                                    textAlign: "center",
                                }}
                                onClick={() => navigate(`/profile/${user.accountId}`)}
                            >
                                <Avatar src={user?.userInfo?.avatarUrl 
                                    ?   `${s3BucketUrl}${user.userInfo.avatarUrl}` : "/default-avatar.png"} alt={user.username} sx={{ width: 80, height: 80, marginBottom: "0.5rem" }} />
                                <CardContent sx={{ padding: "0" }}>
                                    <Typography variant="body1">{user.username}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}

export default AllUsersPage;
