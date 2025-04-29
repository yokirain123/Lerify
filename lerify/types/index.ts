// types/index.ts
export interface SpotifySong {
    id: string;
    title: string;
    author: string;
    imageUrl: string;
    previewUrl: string | null; // to play preview if you want later
  }
  