import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Box, Button, ImageList } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useMemes } from './useMemes';
import { useUser } from '../authentication/useUser';
import { useDeleteMeme } from './useDeleteMeme';

import MemeCard from './MemeCard';
import SmallLoader from '../../ui/SmallLoader';
import Loader from '../../ui/Loader';
import { useVoteToggle } from './useVoteToggle';
import PostFloatingActionButton from '../../ui/PostFloatingActionButton';

import { NO_MORE_MEMES } from '../../utils/labels';

//!REFACTOR: and figure out the loading more memes issue

function UserMemes() {
    let { isLoading: isLoadingUser, user, isAuthenticated } = useUser();
    let {memes, isFetching, fetchNextPage, hasNextPage, status} = useMemes();
    let { isDeleting, deleteMeme } = useDeleteMeme("");
    let {toggleVote, isToggling} = useVoteToggle();

    function onVoteToggle(isVoted, memeId, userId){
        toggleVote({isVoted, memeId, userId});
    }

    function onVoteToggleNotLoggedIn(){
        navigate("/login", { replace: true });
    }

    function deleteHandler(meme){
        if(confirm("Are you sure?")){
            let imageFileName = meme.image.substring(meme.image.lastIndexOf("/")+1, meme.image.length);
            deleteMeme({memeId: meme.id, imageFileName: imageFileName});
        }
    }

    if(status === "loading" || isLoadingUser) return(<Loader />);

    if(memes?.length <= 0){
        return(
            <SmallLoader text="No memes to display" nothingToLoad/>
        );
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ bgcolor: 'background.paper'}}
        >
            <InfiniteScroll
                dataLength={memes ? memes.length : 0}
                next={()=>fetchNextPage()}
                hasMore={hasNextPage}
                loader={<SmallLoader 
                    text="fetching more memes..."
                />}
                endMessage={isFetching ? null 
                : <SmallLoader 
                    nothingToLoad={true} 
                    text={NO_MORE_MEMES}
                />}
            >
                <Box>
                    {memes && memes.map((meme)=>{
                        return(
                            <MemeCard 
                                key={meme.id}
                                id={meme.id}
                                title={meme.title}
                                image={meme.image}
                                poster={meme.profiles?.full_name}
                                commentCount={meme.comment_count}
                                voteCount={meme.votes.length}
                                isVotedByUser={meme.is_voted}
                                voteHandler={isAuthenticated ? ()=>onVoteToggle(meme.is_voted, meme.id, user.id) : onVoteToggleNotLoggedIn}
                                isToggling={isToggling}
                                deleteHandler={deleteHandler}
                                isAuthenticated={isAuthenticated}
                                userId={user?.id}
                                posterId={meme.posted_by}
                            />
                        );
                    })}
                </Box>
            </InfiniteScroll>

            <PostFloatingActionButton 
                postURL="/post"
                redirectURL="/login"
                isToRedirect={!isAuthenticated}
            />
        </Box>
    );
}

export default UserMemes;