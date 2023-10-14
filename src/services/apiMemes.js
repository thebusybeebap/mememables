import supabase, { supabaseUrl } from "./supabase";

const MEMES_PER_PAGE = 5;
const IMG_BASE_PATH = '/storage/v1/object/public/memes/';
const MAX_RANDOM_NUM = 1000;

export async function createMeme(newMeme){

    let {title,image,user} = newMeme;

    let imageName = `${Math.round(Math.random() * MAX_RANDOM_NUM)}-${image.name}`;
    let imagePath = `${supabaseUrl}${IMG_BASE_PATH}${imageName}`;
    
    const { data, error } = await supabase
    .from('memes')
    .insert([
        { title: title, image: imagePath, posted_by: user.id},
    ])
    .select().single();

    const { error: storageError } = await supabase
    .storage
    .from('memes')
    .upload(imageName, image);

    if(storageError){
        await supabase
            .from('memes')
            .delete()
            .eq('id', data.id);
        console.error(storageError);
        throw new Error(`Can't create Meme, image failed to upload`);
    }

    return data;
}

export async function getMemesByBatch({pageParam = 0, username}){

    let {count} = await supabase
    .from('memes')
    .select(
        "id",
        { count: "exact" }
    );

    let fromRange = ((pageParam * MEMES_PER_PAGE) + 1) - 1;
    let toRangeRaw = ((pageParam * MEMES_PER_PAGE) + MEMES_PER_PAGE) - 1;
    let toRange = toRangeRaw;

    if(toRangeRaw >= count){
        toRange = count - 1;
    }

    let query = supabase
    .from('memes')
    .select(
        "id, created_at, title, image, posted_by, profiles!inner(full_name)"
    );
    if(username){
        query = query.eq('profiles.full_name', username);
    }
    query = query.range(fromRange, toRange).order('created_at', { ascending: false });

    let {data, error} = await query;

    if(error){
        console.error(error);
        throw new Error("Failed fetching Memes");
    }

    return {data, pageParam, count};
}

export async function getMeme(memeId){
    let { data, error } = await supabase
    .from('memes')
    .select(
        "id, created_at, title, image, posted_by, profiles(full_name), votes(voted_by)"
    )
    .eq('id', memeId)
    .single();

    if(error){
        console.error(error);
        throw new Error(`Failed fetching Meme:${memeId}`);
    }

    return data;
}

export async function deleteMeme({memeId, imageFileName}){
    const { error: dataError } = await supabase
    .from('memes')
    .delete()
    .eq('id', memeId);

    if(dataError){
        console.error(dataError);
        throw new Error(`Failed deleting Meme:${memeId}`);
    }

    const { error: imageError } = await supabase
    .storage
    .from('memes')
    .remove([imageFileName]);

    if(imageError){
        console.error(imageError);
        throw new Error(`Failed deleting ${imageFileName}`);
    }

    return {dataError, imageError};
}