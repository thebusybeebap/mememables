import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signInWithProvider } from "../../services/apiAuth";

export function useLogin(){
    let {mutate: DiscordLogin, isLoadingD} = useMutation({
        mutationFn: ()=>signInWithProvider('discord'),
    });

    let {mutate: TwitchLogin, isLoadingT} = useMutation({
        mutationFn: ()=>signInWithProvider('twitch'),
    });

    return({DiscordLogin, isLoadingD, TwitchLogin, isLoadingT});
}