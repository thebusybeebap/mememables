import supabase from "./supabase";

export async function signInWithProvider(provider) {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
    });

    if(error) throw new Error(error.message);
}

export async function signout() {
    const { error } = await supabase.auth.signOut();
    if(error) throw new Error(error.message);
}

export async function getCurrentUser(){
    let {data: session} = await supabase.auth.getSession();

    if(!session.session) return null;

    let {data, error} = await supabase.auth.getUser();

    if(error) throw new Error(error.message);

    return data?.user;
}