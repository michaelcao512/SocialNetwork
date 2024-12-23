import styled from '@emotion/styled';
import { Link } from "react-router-dom";
import { Button, CardContent, Stack } from "@mui/material";


export const StyledStack = styled(Stack)({
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",    
});

export const StyledCard = styled(CardContent)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    margin: "auto",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    backgroundColor: "white",
    "&:hover": {
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)"
    }
})


export function StyledLink(props) {
    const { destination, text } = props;
    return ( 
        <Button component={Link} to={destination} 
            color="secondary" variant="contained"
            sx={
                {
                    "&:hover": {
                        backgroundColor: "#f1356d",
                        color: "white"
                    },
                    margin: "5px"
                }
            }
        
        
        >{text}</Button>
    );
}