import supabase, { supabaseUrl } from "./supabase";

export async function getVotesCount(memeId){

    let {count} = await supabase
    .from('votes')
    .select(
        "id",
        { count: "exact" }
    );

    return count;
}

export async function isVotedByUser({memeId, userId}){
    return true;
}

export async function userVoteMeme({memeId, userId}){
    return {};
}

export async function userUnvoteMeme(memeId, userId){
    return {};
}

export async function getMemeIdsVotedByUser({memeId, userId}){
    return {};
}