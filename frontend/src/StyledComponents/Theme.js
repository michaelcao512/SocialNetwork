import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            paper: '#f3f3f3', 
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
        third:{
            main:'#CAE4F6',
        }
    },
});

export default theme;