import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { io } from "socket.io-client";

const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

const socket = io(baseURL, {
    // only Connect if users is authenticated
    autoConnect: false,
    // enbale Sending cookies and auth headers
    withCredentials: true
});

export const useChatStore = create((set, get) => ({
    users: [],
    isLoading: false,
    error: null,
    socket: socket,
    isConnected: false,
    onlineUsers: new Set(),
    userActivities: new Map(),
    messages: [],
    selectedUser: null,

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
    
    initSocket: (userId) => {
        if(!get().isConnected){
            socket.auth = { userId };
            socket.connect();
            socket.emit("user_connected", userId);

            socket.on("users_online", (users) => {
                set({ onlineUsers: new Set(users) });
            });

            socket.on("activities" , (activities) => {
                set({ userActivities: new Map(activities) });
            });

            socket.on("user_connected" , (userId) => {
                set((state) => ({
                    onlineUsers: new Set([...state.onlineUsers, userId])
                }));
            });

            socket.on("user_disconnected" , (userId) => {
                set((state) => {
                    const newOnlineUsers = new Set(state.onlineUsers);
                    newOnlineUsers.delete(userId);
                    return { onlineUsers: newOnlineUsers };
                }); 
            });

            socket.on("receive_message", (message) => {
                set((state) => ({
                    messages: [...state.messages, message]
                }));
            });

            socket.on("message_sent", (message) => {
                set((state) => ({
                    messages: [...state.messages, message]
                }));
            });

            socket.on("activity_updated", ({userId, activity }) => {
                set((state) => {
                    const newActivities = new Map(state.userActivities);
                    newActivities.set(userId, activity);
                    return { userActivities: newActivities };
                });
            });

            set({ isConnected: true });
        }
    },

    disconnectSocket: () => {
        if(get().isConnected){
            socket.disconnect();
            set({ isConnected: false });
        }
    },

    sendMessage: async (receiverId, senderId, content) => {
        const socket = get().socket;
        if(!socket) return;

        socket.emit("send_message", { receiverId, senderId, content });
    },

    fetchMessages: async (userId) => {
        set({ isLoading: true, error: null });
        
        try {
            const response = await axiosInstance.get(`/users/messages/${userId}`);
            set({ messages: response.data });
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },
    
    setSelectedUser: (user) => set({ selectedUser: user })

}));