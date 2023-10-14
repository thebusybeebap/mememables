import supabase, { supabaseUrl } from "./supabase";

export async function addVote(memeId, userId){

    const { data, error } = await supabase
    .from('votes')
    .insert([
      { meme_id: memeId, voted_by: userId },
    ])
    .select();

    if(error){
        console.error(error);
        throw new Error(`Failed vote toggle`);
    }

    return data;
}

export async function removeVote(memeId, userId){
    
    const { data, error } = await supabase
    .from('votes')
    .delete()
    .match({ meme_id: memeId, voted_by: userId });
    
    if(error){
        console.error(error);
        throw new Error(`Failed vote toggle`);
    }

    return data;
}

export async function getMemeIdsVotedByUser({memeId, userId}){
    return {};
}