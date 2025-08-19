import supabase from "./supabase";

export async function signInWithProvider(provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
  });

  if (error) throw new Error(error.message);
}

export async function signInWithPassword(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
}

export async function signout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  let { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  let { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  if (data?.user.user_metadata) return data?.user;
}

export async function deleteCurrentUser(userId) {
  const { data, error } = await supabase.auth.admin.deleteUser(userId);

  if (error) throw new Error(error.message);
}
