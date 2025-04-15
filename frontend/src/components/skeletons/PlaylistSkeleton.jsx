const PlaylistSkeleton = () => {
    return Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="p-2 rounded-md flex items-center gap-3">
            <div className="w-12 h-12 bg-zinc-800 rounded-md flex-shrlink-0 animate-pulse" />

            <div className="flex-1 min-w-0 hidden md:block space-y-2">
                <div className="h-4 bg-zinc-800 rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-zinc-800 rounded w-1/2 animate-pulse" />
            </div>
        </div>
    )) ;
};

export default PlaylistSkeleton;