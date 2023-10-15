
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { postComment as postCommentApi } from "../../services/apiComments";
import { useParams } from "react-router-dom";

export function usePostComment(){

    let {memeId} = useParams();
    let queryClient = useQueryClient();

    function postNewComment({text, userId}){
        let newComment = {text, memeId, userId};
        postCommentApi(newComment);
    }

    let {mutate: postComment, isLoading: isPosting} = useMutation({
        mutationFn: postNewComment,
        onSuccess:(data)=>{
            toast.success("Comment Successfully Posted!");

            queryClient.invalidateQueries({
                queryKey: ['comments'],
            });

            queryClient.refetchQueries({ 
                queryKey: ['comments'] 
            });
        },
        onError: (err) => toast.error(err.message) 
    });

    return { isPosting, postComment };
}