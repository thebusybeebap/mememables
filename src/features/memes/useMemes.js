import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getMemesByBatch } from '../../services/apiMemes';
import { getCurrentUser } from "../../services/apiAuth";

const MEMES_LOADED = 5;

function getNextMemeBatch(lastPage){
    let end = lastPage.count - (lastPage.pageParam * MEMES_LOADED);
    if(end <= MEMES_LOADED) return undefined;
    return (lastPage.pageParam + 1);
}

export function useMemes(){

    let {isLoading, data: user} = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser
    });

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
        queryFn: ({ pageParam = 0 }) => getMemesByBatch({pageParam}),
        getNextPageParam: getNextMemeBatch
    });

    let memes = data?.pages.reduce((acc, page)=>{
        return [...acc, ...page.data];
    },[]);

    memes = memes?.map((meme)=>{
        let votes = meme?.votes.map((vote)=>vote.voted_by)
        return {...meme, votes: votes, is_voted: votes.includes(user?.id)};
    });

    //console.log("useMemesTest");
    //console.dir(user);

    return {memes, isFetching, fetchNextPage, hasNextPage, status};
}