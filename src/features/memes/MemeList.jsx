import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import { Box } from '@mui/material';

import { useUser } from '../authentication/useUser';
import { useMemes } from './useMemes';
import { useVoteToggle } from './useVoteToggle';

import MemeCard from './MemeCard';
import SmallLoader from '../../ui/SmallLoader';
import PostFloatingActionButton from '../../ui/PostFloatingActionButton';
import Loader from '../../ui/Loader';
import { NO_MORE_MEMES } from '../../utils/labels';
import { useNavigate } from 'react-router-dom';

function MemeList() {

    let navigate = useNavigate();
    let { isLoading: isLoadingUser, user, isAuthenticated } = useUser();
    let {memes, isFetching, fetchNextPage, hasNextPage, status} = useMemes();
    let {toggleVote, isToggling} = useVoteToggle(); 

    function onVoteToggle(isVoted, memeId, userId){
        toggleVote({isVoted, memeId, userId});
    }

    function onVoteToggleNotLoggedIn(){
        navigate("/login", { replace: true });
    }

    if(status === "loading") return(<Loader />);

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
                                voteCount={meme.votes.length}
                                isVotedByUser={meme.is_voted}
                                voteHandler={isAuthenticated ? ()=>onVoteToggle(meme.is_voted, meme.id, user.id) : onVoteToggleNotLoggedIn}
                                isToggling={isToggling}
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

export default MemeList;