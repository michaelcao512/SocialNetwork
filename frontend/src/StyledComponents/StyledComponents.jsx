import styled from '@emotion/styled';
import { Link } from "react-router-dom";
import { Button, CardContent, Stack, Box } from "@mui/material";

export const StyledStack = styled(Stack)({
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    maxWidth: "100vw", 
    margin: "auto",
    padding: "1rem",
    boxSizing: "border-box",
});

export const StyledCard = styled(CardContent)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "800px",
    margin: "auto",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxSizing: "border-box",
    "&:hover": {
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)"
    }
}));

export const StandardContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: '100%',
    margin: 'auto',
    boxSizing: "border-box", 
}));

export const StyledNavLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
        color: theme.palette.primary.main,
    },

    '&.active > div': {
        backgroundColor: theme.palette.action.selected,
  },
}));

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

export const StyledButton = styled(Button)(({ theme }) => ({
    width: '100%',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
}));

export const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const MainContent = styled.div`
  flex-grow: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

export const PostHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '0.5rem',
}));