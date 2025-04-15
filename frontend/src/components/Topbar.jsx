import { SignedOut, UserButton } from "@clerk/clerk-react";
import SingnInAuthButtons from "./SingnInAuthButtons.jsx";
import { useAuthStore } from "@/stores/useAuthStore.js";
import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils.js";
import { buttonVariants } from "./ui/button.jsx";

const Topbar = () => {
    const { isAdmin } = useAuthStore();

    return (
        <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75
         backdrop-blur-md z-10">
            <div className="flex gap-2 items-center">
                <img src="/extra/spotify.png" alt="Spotify logo" className="size-8" />
                Spotify
            </div>
            <div className="flex items-center gap-4">
                {
                isAdmin && (
                    <Link to={"/admin"} className={cn(
                        buttonVariants({ variant: "outline" })
                    )} >
                        <LayoutDashboard className="size-4 mr-2" />
                        Admin Dashboard
                    </Link>
                    )
                }

                <SignedOut>
                    <SingnInAuthButtons />
                </SignedOut>
                
                {/* Will be shown if we are SignIn */}
                <UserButton />
            </div>
        </div>
    );
}

export default Topbar;