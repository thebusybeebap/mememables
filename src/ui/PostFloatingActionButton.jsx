import { Fab, Hidden } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

function PostFloatingActionButton({postURL, redirectURL, isToRedirect}) {

    let navigate = useNavigate();

    function handlePostClick(){ //props, 
        if(isToRedirect){
            navigate(redirectURL);
        }
        else{
            navigate(postURL);
        }
    }

    return (
        <Hidden smUp>
            <Fab 
                color="secondary"
                size="medium"
                onClick={handlePostClick}
                aria-label="post" 
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                <EditIcon />
            </Fab>
        </Hidden>
    );
}

export default PostFloatingActionButton;