import { Card, CardContent } from "@/components/ui/card.jsx";
import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {

    const { isLoaded, user } = useUser();
    const navgate =  useNavigate(); // to connect navigate to different page
    const syncAttempted = useRef(false); // For one time LogIn

    useEffect(() => {
        const syncUser = async () => {
            try {
                if(!isLoaded || !user || syncAttempted.current) return;

                await axiosInstance.post("/auth/callback", {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    imageUrl: user.imageUrl,
                });
                syncAttempted.current = true; // Log in done

            } catch (error) {
                console.log("Error in AuthCallbackPage", error);
            } finally{
                navgate("/");
            }
        }

        syncUser();
    }, [isLoaded, user, navgate]);

    return (
        <div className="h-screen w-full bg-black flex items-center justify-center">
            <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
                <CardContent className="flex flex-col items-center gap-4 pt-6">
                    <Loader className="size-6 text-emerald-500 animate-spin" />
                    <h3 className="text-zinc-400 text-xl font-bold">Logging you in</h3>
                    <p className="text-zinc-400 text-sm">Redirecting...</p>
                </CardContent>
            </Card>
        </div>
    );
}

export default AuthCallbackPage;