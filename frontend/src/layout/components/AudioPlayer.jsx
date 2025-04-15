import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
    const { currentSong, isPlaying, playNext } = usePlayerStore()

    const audioRef = useRef(null);
    const previousSongRef = useRef(null);

    // To handle Play and Pause
    useEffect(() => {
        if(isPlaying) audioRef.current?.play();
        else audioRef.current?.pause();
    },[ isPlaying ]);

    // To handle Songs end
    useEffect(() => {
        const audio = audioRef.current;

        const handleEnded = () => {
            playNext();
        };

        audio?.addEventListener("ended", handleEnded);

        // Cleanup function to remove the event listener
        return () => audio?.removeEventListener("ended", handleEnded);
    },[ playNext ]);

    // To handle Song Changes
    useEffect(() => {
        if(!audioRef.current || !currentSong) return;
        const audio = audioRef.current;

        // check if it is a New Song
        const isSongChange = previousSongRef.current !== currentSong?.audioUrl;
        if(isSongChange){
            audio.src = currentSong?.audioUrl;
            // reset the playback position
            audio.currentTime = 0;
            previousSongRef.current = currentSong?.audioUrl;
            // Play the new Song
            if(isPlaying) audio.play();
        }
    },[ currentSong, isPlaying ]);

    return <audio ref={audioRef} />;
};

export default AudioPlayer;