
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMeme } from "../../services/apiMemes";

async function getMemeData(memeId){
  let meme = await getMeme(memeId);
  meme.votes = meme.votes.map((vote)=>vote.voted_by);
  meme.is_voted = false;
  return meme;
}

export function useMeme(){

    let {memeId} = useParams();

    let {isLoading, data: meme, error} = useQuery({
        queryKey: ['meme'],
        queryFn: ()=>getMemeData(memeId)
    });
    

    return {isLoading, meme, error};
}