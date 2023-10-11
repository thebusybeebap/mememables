import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Box, Button, ImageList } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useUserMemes } from './useUserMemes';
import { useUser } from '../authentication/useUser';
import { useDeleteMeme } from './useDeleteMeme';

import MemeCard from './MemeCard';
import SmallLoader from '../../ui/SmallLoader';
import Loader from '../../ui/Loader';

//!REFACTOR

function UserMemes() {
    let { isLoading: isLoadingUser, user, isAuthenticated } = useUser();
    let {memes, isFetching, fetchNextPage, hasNextPage, status, username} = useUserMemes();
    let { isDeleting, deleteMeme } = useDeleteMeme("");

    if(status === "loading" || isLoadingUser) return(<Loader />);

    if(memes?.length === 0){
        return(
            <SmallLoader text="No memes to display" nothingToLoad/>
        );
    }

    function handleDelete(meme){
        if(confirm("Are you sure?")){
            let imageFileName = meme.image.substring(meme.image.lastIndexOf("/")+1, meme.image.length);
            deleteMeme({memeId: meme.id, imageFileName: imageFileName});
        }
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
                    text={"No more memes. Go touch some grass."}
                />}
            >
                <Box>
                    <ImageList cols={1} gap={24}>
                        {memes && memes.map((meme)=>{
                            return(
                                <React.Fragment key={meme.id}>
                                    <MemeCard 
                                        id={meme.id}
                                        title={meme.title}
                                        image={meme.image}
                                        poster={meme?.profiles?.full_name}
                                    />
                                    {(isAuthenticated && user.id === meme.posted_by)
                                        && <Button startIcon={<DeleteIcon />} variant="contained" onClick={()=>handleDelete(meme)}>Delete Meme</Button>
                                    }
                                </React.Fragment>
                            );
                        })}
                    </ImageList>
                </Box>
            </InfiniteScroll>
        </Box>
    );
}

export default UserMemes;