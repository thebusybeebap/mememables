import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInWithProvider, signInWithPassword } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin(){

    let navigate = useNavigate();
    let queryClient = useQueryClient();

    let {mutate: DiscordLogin, isLoadingD} = useMutation({
        mutationFn: ()=>signInWithProvider('discord'),
    });

    let {mutate: TwitchLogin, isLoadingT} = useMutation({
        mutationFn: ()=>signInWithProvider('twitch'),
    });

    let {mutate: PasswordLogin, isLoadingP} = useMutation({
        mutationFn: ({email, password}) => signInWithPassword(email, password),
        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user);
            navigate('/', {replace: true});
        },
        onError: (err) => {
            toast.error('Provided email or password are incorrect');
        }
    });

    return({DiscordLogin, isLoadingD, TwitchLogin, isLoadingT, PasswordLogin, isLoadingP});
}