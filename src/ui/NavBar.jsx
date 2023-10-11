import { Link, useNavigate } from 'react-router-dom';

import { AppBar, Avatar, Box, Button, Toolbar } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

import { useLogout } from '../features/authentication/useLogout';
import { useUser } from '../features/authentication/useUser';
import Logo from './Logo';

import { LOGIN_BUTTON, LOGOUT_BUTTON, POST_BUTTON } from '../utils/labels';

function NavBar() {

    let navigate = useNavigate();
    let {user, isLoadingUser, isAuthenticated} = useUser();
    let {logout, isLoading} = useLogout();

    function handleLoginClick(){
        navigate('/login');
    }

    function handleLogoutClick(){
        logout();
    }

    function handlePostClick(){
        if(!isAuthenticated){
            navigate('/login');
        }
        else{
            navigate('/post');
        }
    }

    return (
        <Box>
            <AppBar component="nav" position="fixed">
                <Toolbar>
                    <Box sx={{ 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems:"center"
                    }}>
                        <Box>
                            <Logo />
                        </Box>
                        <Box sx={{ 
                            display: 'flex', 
                            gap: '0.5rem' 
                        }}>
                            {isAuthenticated 
                                ? <Button 
                                    color="inherit" 
                                    onClick={handleLogoutClick}
                                    startIcon={<LogoutIcon />}
                                >
                                    {LOGOUT_BUTTON}
                                </Button> 
                                : <Button 
                                    color="inherit"
                                    onClick={handleLoginClick}
                                    startIcon={<LoginIcon />}
                                >
                                    {LOGIN_BUTTON}
                                </Button>

                            }
                            {isAuthenticated && 
                                <Link to={`users/${user?.user_metadata?.full_name}`}>
                                    <Avatar 
                                        alt={user?.user_metadata?.full_name}
                                        src={user?.user_metadata?.avatar_url}
                                    />
                                </Link>
                            }
                            
                            <Button 
                                variant="outlined"
                                color="inherit"
                                sx={{ borderRadius: '20rem' }}
                                onClick={handlePostClick}
                                startIcon={<CreateIcon />}
                            >
                                {POST_BUTTON}
                            </Button>

                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            
            <Box component="main" sx={{ p: 0 }}>
                <Toolbar />
            </Box>
        </Box>

    );
}

export default NavBar;