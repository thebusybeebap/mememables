import { Box, Button, Tooltip, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useLogin } from './useLogin';
import Loader from '../../ui/Loader';
import { FULL_BANNER, LOGIN_WITH_DISCORD, DISCORD_TOOLTIP, LOGIN_WITH_TWITCH, TWITCH_TOLLTIP } from "../../utils/labels";

function LoginForm() {

    let {DiscordLogin, isLoadingD, TwitchLogin, isLoadingT} = useLogin();

    if(isLoadingT || isLoadingD) return <Loader />;

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
                    fontFamily: 'Marker Felt',
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

        </Box>
    );
}

export default LoginForm;
