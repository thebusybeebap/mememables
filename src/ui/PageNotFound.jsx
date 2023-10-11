import { Box, Typography } from '@mui/material';

import { PAGE_NOT_FOUND_HEADER, REDIRECT_INSTRUCTION } from '../utils/labels';

function PageNotFound() {

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
                <Typography variant='h5'>{PAGE_NOT_FOUND_HEADER}</Typography>
                <a href="/"><Typography variant='subtitle'>{REDIRECT_INSTRUCTION}</Typography></a>
                

            </Box>
        </Box>

    );
}

export default PageNotFound;
