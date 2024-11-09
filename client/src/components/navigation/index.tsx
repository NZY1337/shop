import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Container, MenuList, MenuItem, Button, Link } from '@mui/material';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import useNavigationStyle from './style';
import MenuDrawer from './drawer';
import { NavLink } from 'react-router-dom';

// https://reactrouter.com/en/main/components/nav-link


const Navigation: React.FC = () => {
  const { loginUser, user, logoutUser } = useUser();
  const classes = useNavigationStyle();
  
  return (
    <AppBar className={classes.container}>
      <Container>
        <MenuDrawer />
        
        <Toolbar className={classes.toolbar}>
            <Box className="nav-logo">
                <Typography variant="h6" sx={{color: 'orange', fontWeight: 'bold', display: { xs: "none", md: "flex" } }}>
                    Swift Fuel
                </Typography>
            </Box> 
            
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuList sx={{ display: "flex" }}>
                    <MenuItem disableRipple>
                        <Link component={ReactRouterLink} to="/">
                            Energy
                        </Link>
                    </MenuItem>

                    <MenuItem disableRipple>
                        <Link component={ReactRouterLink} to="/test1">
                            Supply
                        </Link>
                    </MenuItem>

                    <MenuItem disableRipple>
                        <Link component={ReactRouterLink} to="/test2">
                            Partners
                        </Link>
                    </MenuItem>

                    {!user && (
                        <MenuItem  disableRipple>
                            <Button variant='contained' color="primary" onClick={() => loginUser({ password: 'secret', email: 'mandreicosmin@yahoo.com' })}>
                                Log In
                            </Button>
                        </MenuItem>
                    )}

                    {user && (
                        <MenuItem disableRipple className={classes.hiUser}>
                            <Link component="span">
                                Hi {user.name}
                            </Link>
                        </MenuItem>
                    )}

                    {user && 
                        <MenuItem disableRipple>
                            <Button  variant='contained' color="error" onClick={logoutUser}>
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





