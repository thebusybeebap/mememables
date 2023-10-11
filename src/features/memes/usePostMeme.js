
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createMeme } from "../../services/apiMemes";

export function usePostMeme(){
    let navigate = useNavigate();

    let {mutate: postMeme, isLoading: isPosting} = useMutation({
        mutationFn: createMeme,
        onSuccess:(data)=>{
            toast.success("Meme Successfully Created!");
            navigate(`/memes/${data.id}`);
        },
        onError: (err) => toast.error(err.message) 
    });

    return { isPosting, postMeme };
}