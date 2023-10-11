import { useNavigate } from 'react-router-dom';

import { Box, Button } from '@mui/material';;

import { useUser } from '../authentication/useUser';
import { useDeleteMeme } from './useDeleteMeme';
import { useMeme } from './useMeme';

import MemeCard from '../memes/MemeCard';
import Loader from '../../ui/Loader';
import { DELETE_CONFIRMATION } from "../../utils/labels";

function MemeView() {
    let navigate = useNavigate();
    let { isLoading: isLoadingUser, user, isAuthenticated } = useUser();
    let {isLoading, meme, error} = useMeme();
    let { isDeleting, deleteMeme } = useDeleteMeme();

    function handleDelete(e){
        if(confirm({DELETE_CONFIRMATION})){
            let imageFileName = meme.image.substring(meme.image.lastIndexOf("/")+1, meme.image.length);
            deleteMeme({memeId: meme.id, imageFileName: imageFileName});
        }
    }

    if(isLoading) return(<Loader />);

    if(error && !isDeleting){
        console.log(error.message);
        navigate("/notfound", { replace: true });
    }

    return (

        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{ bgcolor: 'background.paper'}}
        >

            <MemeCard 
                id={meme.id}
                title={meme.title}
                image={meme.image}
                poster={meme.profiles.full_name}
                cardSize="md"
            />    

            {(isAuthenticated && user.id === meme.posted_by)
                && <Button onClick={handleDelete}>Delete</Button>
            }

        </Box>
    );
}

export default MemeView;
