import { Box, Grid } from '@mui/material';

import MemeForm from '../features/memes/MemeForm';

function PostMeme() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <MemeForm />
        </Box>
    );
}

export default PostMeme;
