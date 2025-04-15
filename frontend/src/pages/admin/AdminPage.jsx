import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import SongsTapContent from "./components/SongsTapContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";

const AdminPage = () => {
    const { isAdmin, isLoading }= useAuthStore();
    const { fetchStats, fetchSongs, fetchAlbums } = useMusicStore();
    useEffect(() => {
        fetchAlbums();
        fetchSongs();
        fetchStats();
    }, [fetchAlbums, fetchSongs, fetchStats]);

    if(!isAdmin && !isLoading){
        return <div>Unauthorized</div>
    }

    return( 
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-zinc-100 p-8">
            <Header />
            <DashboardStats />

            <Tabs defaultValue="songs" className="space-y-6">
                <TabsList className="p-1 bg-zinc-800/50">
                    <TabsTrigger value="songs" className="data-[state-actve]:bg-zinc-700 cursor-pointer" >
                        <Music className="mr-2 size-4" />
                        Songs
                    </TabsTrigger>

                    <TabsTrigger value="albums" className="data-[state-actve]:bg-zinc-700 cursor-pointer" >
                        <Album className="mr-2 size-4" />
                        Albums
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="songs">
                    <SongsTapContent />
                </TabsContent>
                <TabsContent value="albums"> 
                    <AlbumsTabContent />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminPage;