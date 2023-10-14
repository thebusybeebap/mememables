
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMeme } from "../../services/apiMemes";
import { getVotesCount, isVotedByUser } from "../../services/apiVotes";

export function useMeme(){

    let {memeId} = useParams();

    async function getMemeData(memeId){
        let meme = await getMeme(memeId);
        let votes = await getVotesCount(memeId);
        let isVoted = await isVotedByUser(memeId); // needs userId

        //alert(votes);

        return {votes, isVoted, ...meme}
    }

    let {isLoading, data: meme, error} = useQuery({
        queryKey: ['meme'],
        queryFn: ()=>getMemeData(memeId)
    });

    return {isLoading, meme, error};
}