import { create } from "zustand";

export const usePlayerStore = create((set, get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,

    initializeQueue: (songs) => {
        set({
            queue: songs,
            currentSong: get().currentSong || songs[0],
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex
        });
    },

    playAlbum: (songs, startIndex = 0) => {
        if(songs.length === 0) return;

        // for current Song
        const song = songs[startIndex];

        set({
            queue: songs,
            currentSong: song,
            currentIndex: startIndex,
            isPlaying: true
        });
    },

    setCurrentSong: (song) => {
        if(!song) return;

        const songIndex = get().queue.findIndex(s => s._id === song._id);

        set({
            currentSong: song,
            isPlaying: true,
            currentIndex: songIndex !== -1 ? songIndex : get().currentIndex
        });
    },

    togglePlay: () => {
        // Invert isPlaying
        const willStartPlaying = !get().isPlaying;

        set({
            isPlaying: willStartPlaying
        });
    },

    playNext: () => {
        const { currentIndex, queue } = get();
        const nextIndext = currentIndex + 1;

        // Playing next song if it's exists
        if(nextIndext < queue.length){
            const nextSong = queue[nextIndext];

            set({
                currentSong: nextSong,
                currentIndex: nextIndext,
                isPlaying: true,
            });
        } else{
            // No next song
            set({ isPlaying: false });
        }
    },

    playPrevious: () => {
        const { currentIndex, queue } = get();
        const previousIndex = currentIndex - 1;
        
        // Playing Previous Song if it's exists
        if(previousIndex >= 0){
            const previousSong = queue[previousIndex];

            set({
                currentSong: previousSong,
                currentIndex: previousIndex,
                isPlaying: true,
            });
        }   else{
            // No Previous Song
            set({ isPlaying: false })
        }
    },
}));