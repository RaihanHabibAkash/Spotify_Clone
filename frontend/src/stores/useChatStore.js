import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useChatStore = create((set) => ({
    users: [],
    isLoading: false,
    error: null,

    fetchUsers: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await axiosInstance.get("/users");
            set({ users: response.data });
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    }, 
}));