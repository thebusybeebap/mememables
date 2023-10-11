import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {signout} from "../../services/apiAuth";

export function useLogout(){
    let navigate =  useNavigate();
    let queryClient = useQueryClient();

    let {mutate: logout, isLoading} = useMutation({
        mutationFn: signout,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate("/login", {replace: true});
        }
    });

    return {logout, isLoading};
}