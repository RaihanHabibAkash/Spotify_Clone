import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume1 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const PlaybackControls = () => {
    const { currentSong, isPlaying, togglePlay, playNext, playPrevious }= usePlayerStore();
    const [volume, setVolume] = useState(75);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = document.querySelector("audio");
        const audio = audioRef.current;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => {
            usePlayerStore.setState({ isPlaying: false });
        };

        audio.addEventListener("timeupdate", updateTime);
        // When song is Loaded
        audio.addEventListener("loadedmetadata", updateDuration);
        // When song is ended
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("ended", handleEnded);
        };
    },[currentSong]);

    const handleSeek = (value) => {
        if(audioRef.current){
            audioRef.current.currentTime = value[0];
        }
    };

    return(
        <footer className="h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4">
            <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
                {/* Current Playing Song */}
                <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
					{currentSong && (
						<>
							<img src={currentSong.imageUrl} alt={currentSong.title} 
                            className="w-14 h-14 object-cover rounded-md"/>
							<div className="flex-1 min-w-0">
								<div className="font-medium truncate hover:underline cursor-pointer">
									{currentSong.title}
								</div>
								<div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
									{currentSong.artist}
								</div>
							</div>
						</>
					)}
				</div>
                
                {/* Playback Controls */}
                <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <Button size="icon" variant="ghost"
							className="hidden sm:inline-flex hover:text-white text-zinc-400 cursor-pointer">
							<Shuffle className="h-4 w-4" />
						</Button>

                        <Button size="icon" variant="ghost" className="hover:text-white text-zinc-400 cursor-pointer" 
                        onClick={playPrevious} disabled={!currentSong}>
							<SkipBack className="h-4 w-4" />
						</Button>

                        <Button size="icon" className="bg-white hover:bg-white/80 text-black rounded-full h-8 w-8 cursor-pointer"
							onClick={togglePlay} disabled={!currentSong}>
							{isPlaying ? 
                                <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" /> }
						</Button>

                        <Button size="icon" variant="ghost" className="hover:text-white text-zinc-400 cursor-pointer" 
                        onClick={playNext}  disabled={!currentSong} >
							<SkipForward className="h-4 w-4" />
						</Button>

                        <Button size="icon" variant="ghost" className="hidden sm:inline-flex hover:text-white text-zinc-400 cursor-pointer">
							<Repeat className="h-4 w-4" />
						</Button>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 w-full">
                        <div className="text-sm text-zinc-400">
                            { formatTime(currentTime) }
                        </div>
                        <Slider value={[currentTime]} max={duration || 100} step={1} onValueChange={handleSeek}
						    className="w-full hover:cursor-grab active:cursor-grabbing" />
                        <div className="text-xs text-zinc-400">
                            { formatTime(duration) }
                        </div>
                    </div>
                </div>
                {/* Volume Controls */}
                <div  className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
                    <Button size="icon" variant="ghost" className="hover:text-white text-zinc-400 cursor-pointer" >
                        <Mic2 className="h-4 w-4" />
                    </Button>

                    <Button size="icon" variant="ghost" className="hover:text-white text-zinc-400 cursor-pointer">
                        <ListMusic className="h-4 w-4" />
                    </Button>

                    <Button size="icon" variant="ghost" className="hover:text-white text-zinc-400 cursor-pointer">
                        <Laptop2 className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button size="icon" variant="ghost" className="hover:text-white text-zinc-400 cursor-pointer">
                            <Volume1 className="h-4 w-4" />
                        </Button>
                        <Slider value={[volume]} max={100} step={1}
							className="w-24 hover:cursor-grab active:cursor-grabbing"
							onValueChange={(value) => {
								setVolume(value[0]);
								if (audioRef.current) {
									audioRef.current.volume = value[0] / 100;
								}
							}} />
                    </div>  
                </div>
            </div>
        </footer>
    );
};

export default PlaybackControls;