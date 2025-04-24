import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

export const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            // Allows cookies,authentication headers to be shared between frontend and backend
            credentials: true
        }
    });

    // userId: socketId
    const userSockets = new Map();
    // userId: activity
    const userActivities = new Map();

    io.on("connection", (socket) => {
        socket.on("user_connected", (userId) => {
            userSockets.set(userId, socket.id);
            userActivities.set(userId, "Idle");

            // Notify other users that this user is logged In
            io.emit("user_connected", userId);

            // Notify this user about other users who are using the app
            socket.emit("users_online", Array.from(userSockets.keys()) );

            io.emit("activities", Array.from(userActivities.entries()) );
        });

        socket.on("update_activity", ({userId, activity}) => {
            userActivities.set(userId, activity);
            io.emit("activity_updated", {userId, activity});
        });

        socket.on("send_message", async (data) => {
            try {
                const { senderId, receiverId, content } = data;

                // Save message to database
                const message = await Message.create({
                    senderId,
                    receiverId,
                    content
                });

                // send to receiver in realtime if they are online
                const receiverSocketId = userSockets.get(receiverId);
                if(receiverSocketId){
                    io.to(receiverSocketId).emit("receive_message", message);;
                }
                
                socket.emit("message_sent", message);
            } catch (error) {
                console.log("Message error", error);
                socket.emit("message_error", error.message);
            }
        });

        socket.on("disconnect", () => {
            let disconnectedUserId;
            for(const [userId, socketId] of userSockets.entries()) {
                // Find disconnected user
                if(socketId === socket.id){
                    disconnectedUserId = userId;
                    userSockets.delete(userId);
                    userActivities.delete(userId);
                    break;
                }
            }
            if(disconnectedUserId){
                io.emit("user_disconnected", disconnectedUserId);
            }
        });
    });
};