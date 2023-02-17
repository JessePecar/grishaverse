import '@/styles/App.css';
import '@/styles/Login/Login.css'
import '@/styles/CreateAccount/CreateAccount.css'
import type { AppProps } from 'next/app'
import RouteGuard from '@/components/RouteGuard';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material';
import { deepPurple, indigo } from '@mui/material/colors';

export default function App({ Component, pageProps }: AppProps) {
  const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: deepPurple[800],
    },
    secondary: {
      main: indigo[400],
    },
  },
};

  const darkTheme = createTheme(themeOptions);

  
  return (
    <ThemeProvider theme={darkTheme}>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </ThemeProvider>
  );
}
