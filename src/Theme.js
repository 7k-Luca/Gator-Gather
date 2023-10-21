// theme.js
import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
    palette: {
        primary: {
            main: '#628395', // Primary color representing the brand
        },
        secondary: {
            main: '#CDF7F6', // Secondary color complementing the primary color
        },
        error: {
            main: '#f44336', // Semantic color for indicating errors
        },
        warning: {
            main: '#ff9800', // Semantic color for indicating warnings
        },
        info: {
            main: '#2196f3', // Semantic color for conveying information
        },
        success: {
            main: '#4caf50', // Semantic color for indicating success
        },
        background: {
            default: '#f5f5f5', // Default background color
        },
        text: {
            primary: '#212121', // Primary text color
            secondary: '#757575', // Secondary text color
        },
    },
});

export default Theme;