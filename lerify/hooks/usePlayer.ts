import { create } from "zustand";

interface PlayerStore {
  ids: string[];
  activeId?: string;
  songUrl: string;  // Add songUrl to the store
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
  setSongUrl: (url: string) => void;  // Add the setSongUrl method
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  songUrl: "",
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids: ids }),
  reset: () => set({ ids: [], activeId: undefined, songUrl: "" }),
  setSongUrl: (url: string) => set({ songUrl: url }), 
}));

export default usePlayer;
