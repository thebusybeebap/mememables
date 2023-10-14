import { useMutation, useQueryClient } from "@tanstack/react-query";
import {addVote, removeVote } from "../../services/apiVotes";

async function toggleVoteApi({isVoted, memeId, userId}){
    let data;
    
    if(isVoted){
      data = await removeVote(memeId, userId);
    }
    else{
      data = await addVote(memeId, userId);
    }

    return data;
}

export function useVoteToggle(){

    let queryClient = useQueryClient();
    
    let {mutate: toggleVote, isLoading: isToggling} = useMutation({
        mutationFn: toggleVoteApi,
        onSuccess: () => {
          //toast.success("vote!");
          queryClient.invalidateQueries({
              queryKey: ['meme']
          })
        },
        onError: (err) => console.error(err.message) 
    });

    return {toggleVote, isToggling};

}