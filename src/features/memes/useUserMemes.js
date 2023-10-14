import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getMemesByBatch } from '../../services/apiMemes';

const MEMES_LOADED = 5;

//!REFACTOR - refarctor from useMemes, call useMemes, or just use useMemes with an added parameter

function getNextUserMemes(lastPage){
    let end = lastPage.count - (lastPage.pageParam * MEMES_LOADED);
    if(end <= MEMES_LOADED) return undefined;
    return (lastPage.pageParam + 1);
}

export function useUserMemes(){

    let {username} = useParams();

    let {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['memes'],
        queryFn: getMemesByBatch, 
        queryFn: ({ pageParam = 0 }) => getMemesByBatch({pageParam, username}),
        getNextPageParam: getNextUserMemes
    });

    let memes = data?.pages.reduce((acc, page)=>{
        return [...acc, ...page.data];
    },[]);

    return {memes, isFetching, fetchNextPage, hasNextPage, status, username};
}