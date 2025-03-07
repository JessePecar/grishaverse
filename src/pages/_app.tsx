import * as React from 'react';
import '@/styles/App.css';
import '@/styles/Login/Login.css'
import '@/styles/CreateAccount/CreateAccount.css'
import type { AppProps } from 'next/app'
import RouteGuard from '@/components/RouteGuard';
import { AppBar, Container, createTheme, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, ThemeOptions, ThemeProvider, Toolbar, Typography } from '@mui/material';
import * as Icons from '@mui/icons-material';
import { deepPurple, indigo } from '@mui/material/colors';
import { userService } from '@/services/userService';
import Head from 'next/head';
import { Box } from '@mui/system';
import Image from 'next/image';
import Router from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const [accountMenu, setAccountMenu] = React.useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const themeOptions: ThemeOptions = {
    palette: {
      mode: 'dark',
      primary: {
        main: deepPurple[400],
        dark: deepPurple[400]
      },
      secondary: {
        main: indigo[400],
        dark: indigo[400]
      },
    },
  };
  
  React.useEffect(() => console.log(userService.userValue), []);
  const darkTheme = createTheme(themeOptions);

  const logOut = () => {
    setAccountMenu(null);
    userService.logout();
  }

  const goToSettings = () => {
    
  }

  const goToPage = (route: string) => {
    setIsOpen(false);
    Router.push(route);
  }
  
  return (
    <ThemeProvider theme={darkTheme}>
      <style global jsx>{`
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
      `}</style>
      <Head>
        <title>Grishaverse</title>
        <meta name="description" content="Into the Grishaverse is brought to you by TotalWine" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/grishaverse.webp" />
      </Head>
      <CssBaseline />
      <RouteGuard>
        {userService.userValue && (
          <AppBar position='static'>
            <Toolbar>
              <IconButton 
                size="large"
                edge="start"
                aria-label="menu"
                sx={{ mr: 2}}
                onClick={() => setIsOpen(true)}>
                <Icons.Menu />
              </IconButton>
              <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center'}}>
                <Image alt="/" width={300} height={50} src="/gv-white.svg"  />
              </Box>
              <div>
                <IconButton 
                  id="account-icon" 
                  size="large" 
                  edge="end"
                  onClick={(e) => setAccountMenu(e.currentTarget)}>
                  <Icons.AccountCircle />
                </IconButton>
                <Menu 
                  id="menu-appbar" 
                  anchorEl={accountMenu}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(accountMenu)}
                  onClose={() => setAccountMenu(null)}
                  >
                  <MenuItem onClick={logOut}>Log Out</MenuItem>
                  <MenuItem onClick={goToSettings}>Settings</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
        )}
        <Drawer 
          anchor="left"
          open={isOpen}
          onClose={() => setIsOpen(false)}>
            <List sx={{ minWidth: 200}}>
              <ListItem key="Home" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icons.Home />
                  </ListItemIcon>
                  <ListItemText primary="Home" onClick={() => goToPage('/Home')}/>
                </ListItemButton>
              </ListItem>
            </List>
        </Drawer>
        <Component {...pageProps} />
      </RouteGuard>
    </ThemeProvider>
  );
}
