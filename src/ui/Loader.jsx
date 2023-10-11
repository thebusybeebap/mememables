//import { Box } from '@mui/system';
import { Typography, Box } from '@mui/material';

function Loader({loadingText=''}) {
  return (
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
    >
        <Typography variant='h5'>LOADING...</Typography>
    </Box>
  );
}

export default Loader;