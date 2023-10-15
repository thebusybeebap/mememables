import { Hidden, Typography } from '@mui/material';

import { PRE_BANNER, INNER_BANNER, POST_BANNER} from '../utils/labels';

function Logo() {
  return (
    <Typography
        variant="h6"
        component="a"
        noWrap
        href="/"
        sx={{
            //fontFamily: 'Marker Felt',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
        }}
    >
        {PRE_BANNER}<Hidden smDown>{INNER_BANNER}</Hidden>{POST_BANNER}
    </Typography>
  );
}

export default Logo;
