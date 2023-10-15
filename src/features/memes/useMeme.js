
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMeme } from "../../services/apiMemes";

async function getMemeData(memeId){ //REACTOR THIS TO USE THE SAME solution like in UseMemes getting user data here as well
  let meme = await getMeme(memeId);
  meme.votes = meme.votes.map((vote)=>vote.voted_by);
  meme.is_voted = false;
  meme.comment_count = meme.comments[0].count;
  //console.dir(meme);
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