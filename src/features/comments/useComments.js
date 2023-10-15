
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getComments } from "../../services/apiComments";

export function useComments(){

    let {memeId} = useParams();

    let {isLoading, data: comments, error} = useQuery({
        queryKey: ['comments'],
        queryFn: ()=>getComments(memeId)
    });

    return {isLoading, comments, error};
}