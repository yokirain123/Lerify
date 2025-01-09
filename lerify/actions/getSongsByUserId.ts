import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Song } from '@/types';

const getSongsByUserId = async (): Promise<Song[]> => {

  const supabase = await createServerComponentClient({
    cookies: await cookies,  // Pass the awaited cookies
  });

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error('Error fetching user:', userError);
    return [];
  }

  if (!user) {
    console.warn('No user found');
    return [];
  }

  const { data: songs, error: songsError } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', user.id);

  if (songsError) {
    console.error('Error fetching songs:', songsError);
    return [];
  }

  return songs || [];
};

export default getSongsByUserId;
