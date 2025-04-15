import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const updateApiToken = (token) => {
    if(typeof token === "string" && token.trim() !== ""){
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
    else{
        delete axiosInstance.defaults.headers.common["Authorization"];
    }
}

const AuthProvider = ({children}) => {
    const { getToken } = useAuth();
    const { checkAdminStatus } = useAuthStore();
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                updateApiToken(token);
                // if the user is admin
                if(token){
                    await checkAdminStatus();
                }

            } catch (error) {
                updateApiToken(null);
                console.log("Error in auth provider");
            } finally{
                setLoading(false);
            }
        };
        
        initAuth();

    }, [getToken]);
 
    if(loading) return(
        <div className="h-screen w-full flex items-center justify-center">
            <Loader className="size-8 text-emerald-500 animate-spin"/>
        </div>
    );

    else return (
        <div>{children}</div>
    );
};

export default AuthProvider;