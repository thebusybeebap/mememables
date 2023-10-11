//import { Box } from '@mui/system';
import { Typography, Box } from '@mui/material';

function SmallLoader({text='', nothingToLoad=false}) {

  return (
    <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
    >
        {nothingToLoad ?
        (<>
            <Typography variant='h6'>{text}</Typography>
        </>)
        :(<>
            <Typography variant='h6'>{text}</Typography>
        </>)
        }
        
    </Box>
  );
}

export default SmallLoader;