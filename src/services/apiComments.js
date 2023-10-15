import supabase, { supabaseUrl } from "./supabase";

export async function getComments(memeId){

    let { data, error } = await supabase
    .from('comments')
    .select('id, text, profiles(full_name, avatar_url)')
    .eq('meme_id', memeId)
    .order('created_at', { ascending: false });;

    if(error){
        console.error(error);
        throw new Error(`Failed to get comments`);
    }

    let comments = data.map((comment)=>{
        return({id: comment.id, text: comment.text, full_name: comment.profiles.full_name, avatar_url: comment.profiles.avatar_url});
    });

    return comments;
}

export async function postComment(newComment){
    const { data, error } = await supabase
    .from('comments')
    .insert([
      { text: newComment.text, meme_id: newComment.memeId, commented_by: newComment.userId },
    ])
    .select();

    if(error){
        console.error(error);
        throw new Error(`Failed to post comment`);
    }

    return data;
}

export async function deleteComment(commentId){
    
    const { data, error } = await supabase
    .from('comments')
    .delete()
    .match({ id: commentId });
    
    if(error){
        console.error(error);
        throw new Error(`Failed to delete comment`);
    }

    return data;
}