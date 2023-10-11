import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteMeme as deleteMemeApi } from "../../services/apiMemes";

export function useDeleteMeme(redirect = "/memes"){

    let navigate = useNavigate();
    let queryClient = useQueryClient();

    let {isLoading: isDeleting, mutate: deleteMeme} = useMutation({
        mutationFn: deleteMemeApi,
        onSuccess: () => {
            toast.success("Meme Successfully Deleted!");
    
            queryClient.invalidateQueries({
                queryKey: ['memes']
            });

            navigate(redirect, { replace: true });
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });

    return { isDeleting, deleteMeme };
}

