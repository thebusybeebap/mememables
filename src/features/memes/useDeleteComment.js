import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteComment as deleteCommentApi } from "../../services/apiComments";

export function useDeleteComment(){

    let queryClient = useQueryClient();

    let {isLoading: isDeleting, mutate: deleteComment} = useMutation({
        mutationFn: deleteCommentApi,
        onSuccess: () => {
            toast.success("Comment Successfully Deleted!");

            queryClient.invalidateQueries({
                queryKey: ['comments']
            });
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });

    return { isDeleting, deleteComment };
}

