import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            main: '#f4f9fd', 
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