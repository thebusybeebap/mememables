import { useState } from 'react';

import { Box, Button, Divider, TextField, Tooltip, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useLogin } from './useLogin';
import Loader from '../../ui/Loader';
import { FULL_BANNER, LOGIN_WITH_DISCORD, DISCORD_TOOLTIP, LOGIN_WITH_TWITCH, TWITCH_TOLLTIP } from "../../utils/labels";

function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let {DiscordLogin, isLoadingD, TwitchLogin, isLoadingT, PasswordLogin, isLoadingP} = useLogin();

    function handleSubmit(e) {
        e.preventDefault();

        if(!email || !password) return;

        PasswordLogin({email, password}, {
            onSettled: () => {
                setEmail("");
                setPassword("");
            }
        });
    }

    if(isLoadingT || isLoadingD || isLoadingP) return <Loader />;

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            gap={1}
        >
            <Typography
                variant="h4"
                color="primary"
                component="a"
                href="/"
                sx={{
                    //fontFamily: 'Marker Felt',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    textDecoration: 'none'
                }}
            >
                {FULL_BANNER}
            </Typography>
            
            <Tooltip title={DISCORD_TOOLTIP} arrow>
                <Button 
                    variant="outlined"
                    onClick={DiscordLogin}
                >
                    <AccountCircleIcon/> {LOGIN_WITH_DISCORD}
                </Button>
            </Tooltip>

            <Tooltip title={TWITCH_TOLLTIP} arrow>
                <Button 
                    variant="outlined"
                    onClick={TwitchLogin}
                >
                    <AccountCircleIcon/> {LOGIN_WITH_TWITCH}
                </Button>
            </Tooltip>

            <Divider>
            <Typography>
                OR
            </Typography>
            </Divider>

                <TextField
                    id="email"
                    label="Email"
                    type="email"
                    autoComplete="current-email"
                    size='small'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    size='small'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button 
                        variant="outlined"
                        onClick={handleSubmit}
                    >
                        <AccountCircleIcon/> LOGIN WITH EMAIL
                </Button>

        </Box>
    );
}

export default LoginForm;
