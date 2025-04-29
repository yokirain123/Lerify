import { create } from "zustand";

interface PlayerStore {
  ids: string[];
  activeId?: string;
  deviceId?: string;
  isPlaying: boolean;
  currentTrack?: Spotify.Track;
  player?: Spotify.Player;
  accessToken?: string;
  
  // Actions
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  setAccessToken: (token: string) => void;
  initializePlayer: (token: string) => Promise<void>;
  playTrack: (spotifyUri: string) => Promise<void>;
  togglePlay: () => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set, get) => ({
  ids: [],
  activeId: undefined,
  deviceId: undefined,
  isPlaying: false,
  currentTrack: undefined,
  player: undefined,
  accessToken: undefined,

  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids }),
  setAccessToken: (token: string) => set({ accessToken: token }),

  initializePlayer: async (token: string) => {
    if (typeof window === "undefined") return;

    if (!window.Spotify) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
    }

    await new Promise<void>((resolve) => {
      if (window.Spotify) {
        resolve();
      } else {
        window.onSpotifyWebPlaybackSDKReady = () => resolve();
      }
    });

    const player = new window.Spotify.Player({
      name: "Your Web App",
      getOAuthToken: (cb) => { cb(token); },
      volume: 0.5
    });

    player.addListener("ready", ({ device_id }) => {
      set({ deviceId: device_id, player });
    });

    player.addListener("player_state_changed", (state) => {
      if (!state) return;
      set({
        currentTrack: state.track_window.current_track,
        isPlaying: !state.paused
      });
    });

    const connected = await player.connect();
    if (!connected) {
      console.error("Failed to connect to Spotify player");
    }
  },

  playTrack: async (spotifyUri: string) => {
    const { accessToken, deviceId } = get();
    if (!accessToken || !deviceId) return;

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: "PUT",
          body: JSON.stringify({ uris: [spotifyUri] }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          }
        }
      );

      if (!response.ok) throw new Error("Playback failed");
      set({ isPlaying: true });
    } catch (error) {
      console.error("Error playing track:", error);
    }
  },

  togglePlay: async () => {
    const { player, isPlaying } = get();
    if (!player) return;

    try {
      if (isPlaying) {
        await player.pause();
      } else {
        await player.resume();
      }
      set({ isPlaying: !isPlaying });
    } catch (error) {
      console.error("Error toggling play:", error);
    }
  },

  reset: () => set({ 
    ids: [], 
    activeId: undefined, 
    isPlaying: false,
    currentTrack: undefined,
    deviceId: undefined,
    player: undefined
  })
}));

export default usePlayer;