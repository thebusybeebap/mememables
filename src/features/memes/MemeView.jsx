import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Button } from '@mui/material';;
import DeleteIcon from '@mui/icons-material/Delete';

import { useUser } from '../authentication/useUser';
import { useDeleteMeme } from './useDeleteMeme';
import { useMeme } from './useMeme';
import { useVoteToggle } from './useVoteToggle';

import MemeCard from '../memes/MemeCard';
import CommentsSection from '../comments/CommentsSection';
import Loader from '../../ui/Loader';
import { DELETE_CONFIRMATION } from "../../utils/labels";
import { useEffect, useState } from 'react';

function MemeView() {
    let navigate = useNavigate();
    let location = useLocation();
    let { isLoading: isLoadingUser, user, isAuthenticated } = useUser();
    let { isLoading, meme, error } = useMeme();
    let { isDeleting, deleteMeme } = useDeleteMeme();
    let [isVoted, setIsVoted] = useState(false);
    let {toggleVote, isToggling} = useVoteToggle(); //MIGHT WANT TO CONSIDER REFACTORING ALL THESE STATES and hooks BY USING useReducer

    function deleteHandler(e){
        if(confirm(DELETE_CONFIRMATION)){
            let imageFileName = meme.image.substring(meme.image.lastIndexOf("/")+1, meme.image.length);
            deleteMeme({memeId: meme.id, imageFileName: imageFileName});
        }
    }

    function onVoteToggle(isVoted, memeId, userId){
        setIsVoted(isVoted=>!isVoted);
        toggleVote({isVoted, memeId, userId});
    }

    function onVoteToggleNotLoggedIn(){
        navigate("/login", { replace: true });
    }

    useEffect(()=>{
        if(meme && user){
            setIsVoted(meme.votes.includes(user.id));
        }
    },[user?.id, meme?.votes]);

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
                posterId={meme.posted_by}
                commentCount={meme.comment_count}
                voteCount={meme.votes.length}
                isVotedByUser={isVoted}
                voteHandler={isAuthenticated ? ()=>onVoteToggle(isVoted, meme.id, user.id) : onVoteToggleNotLoggedIn}
                isToggling={isToggling}
                cardSize="md"
                deleteHandler={deleteHandler}
                userId={user?.id}
                isAuthenticated={isAuthenticated}
            />

            <CommentsSection
                user={user}
                isAuthenticated={isAuthenticated}
                autoFocus={location.pathname.includes("/comments")}
            />

        </Box>
    );
}

export default MemeView;
