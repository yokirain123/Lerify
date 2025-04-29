// types/spotify.d.ts
declare namespace Spotify {
    interface Player {
      connect(): Promise<boolean>;
      disconnect(): void;
      pause(): Promise<void>;
      resume(): Promise<void>;
      togglePlay(): Promise<void>;
      addListener(event: 'ready', callback: (args: { device_id: string }) => void): void;
      addListener(event: 'player_state_changed', callback: (state: PlayerState) => void): void;
    }
  
    interface PlayerState {
      paused: boolean;
      track_window: {
        current_track: Track;
      };
    }
  
    interface Track {
      uri: string;
      id: string;
      name: string;
      duration_ms: number;
      artists: Artist[];
      album: Album;
    }
  
    interface Artist {
      name: string;
      uri: string;
      id: string;
    }
  
    interface Album {
      name: string;
      uri: string;
      images: Image[];
    }
  
    interface Image {
      url: string;
      height?: number;
      width?: number;
    }
  }
  
  declare interface Window {
    onSpotifyWebPlaybackSDKReady?: () => void;
    Spotify?: {
      Player: new (options: {
        name: string;
        getOAuthToken: (cb: (token: string) => void) => void;
        volume?: number;
      }) => Spotify.Player;
    };
  }