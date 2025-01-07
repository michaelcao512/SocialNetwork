import { Avatar, Typography } from "@mui/material";
import { StyledLink } from "../../../StyledComponents/StyledComponents";
import "./user.css";

function User(props) {
  const { user } = props;

  return (
    <>
      <StyledLink
        destination={`/profile/${user.accountId}`}
        text={user.username}
      />
      <div className="user-profiles">
        <Avatar src={user?.avatarUrl || null}>
          {user?.userInfo?.firstName?.charAt(0) || "#"}
        </Avatar>
        <Typography
          id="user-fullname"
          variant="body1"
          align="left"
          gutterBottom
        >
          {" "}
          {user.userInfo.firstName} {user.userInfo.lastName}{" "}
        </Typography>
      </div>
    </>
  );
}

export default User;
