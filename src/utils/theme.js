import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
          main: '#7e57c2',
        },
        secondary: {
          main: '#ffab00',
        },
        error: {
          main: '#d50000',
        },
        warning: {
          main: '#ff6d00',
        },
      },
});