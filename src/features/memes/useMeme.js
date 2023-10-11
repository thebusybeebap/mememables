
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMeme } from "../../services/apiMemes";

export function useMeme(){

    let {memeId} = useParams();

    let {isLoading, data: meme, error} = useQuery({
        queryKey: ['meme'],
        queryFn: ()=>getMeme(memeId)
    });

    return {isLoading, meme, error};
}