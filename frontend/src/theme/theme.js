import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          padding: "6px 16px",
        },
        standardWarning: () => ({
            color: '#ffba2e',
            fontSize: '1rem',
            backgroundColor: '#fff2de',
            '& .MuiAlertTitle-root': {
              color: '#ffba2e'
            },
            '& .MuiAlert-icon': {
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '30px',
                height: '30px',
                borderRadius: '5px',
                backgroundColor: '#ffba2e', 
                opacity: '0.9',
                marginTop: '6px'
              }
          }),
      },
    },
    MuiAlertTitle: {
        styleOverrides: {
            root: {
                fontWeight: 'bold',
                fontSize: '1.1rem'
            }
        }
    },
  },
});

export default theme;

