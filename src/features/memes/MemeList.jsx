import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import { Box, ImageList } from '@mui/material';

import { useMemes } from './useMemes';

import MemeCard from './MemeCard';
import SmallLoader from '../../ui/SmallLoader';
import Loader from '../../ui/Loader';
import { NO_MORE_MEMES } from '../../utils/labels';

function MemeList() {

    let {memes, isFetching, fetchNextPage, hasNextPage, status} = useMemes();

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
                    <ImageList cols={1} gap={24}>
                        {memes && memes.map((meme)=>{
                            return(
                                <MemeCard 
                                    key={meme.id}
                                    id={meme.id}
                                    title={meme.title}
                                    image={meme.image}
                                    poster={meme.profiles?.full_name}
                                />
                            );
                        })}
                    </ImageList>
                </Box>
            </InfiniteScroll>
        </Box>
    );
}

export default MemeList;