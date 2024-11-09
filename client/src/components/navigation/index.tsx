import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Container, MenuList, MenuItem, Button, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import useNavigationStyle from './style';

const Navigation: React.FC = () => {
  const { loginUser, user, logoutUser } = useUser();
  const classes = useNavigationStyle();

  return (
    <AppBar className={classes.container}>
      <Container>
        <Toolbar style={{ padding: 0, display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: "flex", alignItems: 'center' }}>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, '&:focus': { outline: 'none' } }}>
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News A.I.
            </Typography>
          </Box> 

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <MenuList sx={{ display: "flex" }}>
              <MenuItem>
                <Link component={ReactRouterLink} to="/">
                  <Typography variant="h6" component="a" sx={{ flexGrow: 1 }}>
                    Home
                  </Typography>
                </Link>
              </MenuItem>

              <MenuItem>
                <Link component={ReactRouterLink} to="/test1">
                  <Typography variant="h6" component="a" sx={{ flexGrow: 1 }}>
                    Test 1
                  </Typography>
                </Link>
              </MenuItem>

             {!user && (
                <MenuItem>
                  <Button variant='contained' sx={{ '&:focus': { outline: 'none' } }} color="error" onClick={() => loginUser({ password: 'secret', email: 'mandreicosmin@yahoo.com' })}>
                    Log In
                  </Button>
                </MenuItem>
              )}

               {user && (
                 <MenuItem>
                   <Typography variant="body1" component="p" sx={{ flexGrow: 1 }}>
                     Hi {user.name}
                   </Typography>
                 </MenuItem>
               )}

                {user && 
                    <MenuItem>
                    <Button variant='contained' sx={{ '&:focus': { outline: 'none' } }} color="error" onClick={logoutUser}>
                        LogOut
                    </Button>
                    </MenuItem>
            }

          
            </MenuList>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;





