import { useInfiniteQuery } from '@tanstack/react-query';

import { getMemesByBatch } from '../../services/apiMemes';

const MEMES_LOADED = 5;

function getNextMemeBatch(lastPage){
    let end = lastPage.count - (lastPage.pageParam * MEMES_LOADED);
    if(end <= MEMES_LOADED) return undefined;
    return (lastPage.pageParam + 1);
}

export function useMemes(){

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

    return {memes, isFetching, fetchNextPage, hasNextPage, status};
}