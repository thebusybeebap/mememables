import { Box, Typography } from '@mui/material';

import { ERROR_HEADER, REDIRECT_INSTRUCTION } from '../utils/labels';

function Error({error}) {

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ bgcolor: 'background.default'}}
        >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                gap="1rem"
            >
                <Typography variant='h5'>{ERROR_HEADER}</Typography>
                <p>{error.message}</p>
                <a href="/"><Typography variant='subtitle'>{REDIRECT_INSTRUCTION}</Typography></a>
            </Box>

        </Box>

    );
}

export default Error;
