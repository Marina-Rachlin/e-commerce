import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          padding: "6px 16px",
        },
        standardWarning: ({ theme }) => ({
            color: '#ffba2e',
            backgroundColor: '#fff2de',
            '& .MuiAlertTitle-root': {
              color: '#ffba2e'
            },
            '& .MuiAlert-icon': {
              color: '#ffba2e'
            }
          }),
      },
    },
  },
});

export default theme;

