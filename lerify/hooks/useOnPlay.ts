import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";
import loadSongUrl from "./useLoadSongUrl"; // Import the utility

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = async (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));

    const selectedSong = songs.find((song) => song.id === id);

    if (selectedSong) {
      // Load the song URL dynamically when the song is played
      const songUrl = await loadSongUrl(selectedSong);

      if (songUrl) {
       player.setSongUrl(songUrl);
      }
    }
  };

  return onPlay;
};

export default useOnPlay;
