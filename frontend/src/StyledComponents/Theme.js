import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            paper: '#f5f5f5', 
        },
        text: {
            primary: '#333', 
        },
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#f50057',
        },
    },
});

export default theme;