import { create } from "zustand";
import { useChatStore } from "./useChatStore.js";

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

        const socket = useChatStore.getState().socket;
        if(socket.auth){
            socket.emit("update_activity" , {
                userId: socket.auth.userId,
                activity: `Playing ${song.title} by ${song.artist}`
            });
        }

        set({
            queue: songs,
            currentSong: song,
            currentIndex: startIndex,
            isPlaying: true
        });
    },

    setCurrentSong: (song) => {
        if(!song) return;

        const socket = useChatStore.getState().socket;
        if(socket.auth){
            socket.emit("update_activity" , {
                userId: socket.auth.userId,
                activity: `Playing ${song.title} by ${song.artist}`
            });
        }

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

        const currentSong = get().currentSong;
        const socket = useChatStore.getState().socket;
        if(socket.auth){
            socket.emit("update_activity", {
                userId: socket.auth.userId,
                activity: willStartPlaying && currentSong ? 
                `Playing ${currentSong.title} by ${currentSong.artist}` : "Idle"
            });
        }

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

            const socket = useChatStore.getState().socket;
            if(socket.auth){
                socket.emit("update_activity" , {
                    userId: socket.auth.userId,
                    activity: `Playing ${nextSong.title} by ${nextSong.artist}`
                });
            }

            set({
                currentSong: nextSong,
                currentIndex: nextIndext,
                isPlaying: true,
            });
        } else{
            // No next song
            set({ isPlaying: false });

            if(socket.auth){
                socket.emit("update_activity" , {
                    userId: socket.auth.userId,
                    activity: "Idle"
                });
            }
        }
    },

    playPrevious: () => {
        const { currentIndex, queue } = get();
        const previousIndex = currentIndex - 1;
        
        // Playing Previous Song if it's exists
        if(previousIndex >= 0){
            const previousSong = queue[previousIndex];

            const socket = useChatStore.getState().socket;
            if(socket.auth){
                socket.emit("update_activity" , {
                    userId: socket.auth.userId,
                    activity: `Playing ${previousSong.title} by ${previousSong.artist}`
                });
            }

            set({
                currentSong: previousSong,
                currentIndex: previousIndex,
                isPlaying: true,
            });
        }   else{
            // No Previous Song
            set({ isPlaying: false })

            const socket = useChatStore.getState().socket;
            if(socket.auth){
                socket.emit("update_activity" , {
                    userId: socket.auth.userId,
                    activity: "Idle"
                });
            }
        }
    },
}));