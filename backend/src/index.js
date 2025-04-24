import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware} from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path"; // buldin NODE Module
import { createServer } from "http"; // buldin NODE Module
import fs from "fs"; // buldin NODE Module
import cors from "cors";
import cron from "node-cron";
// socket.io
import { initializeSocket } from "./lib/socket.js";

// Importing Database Connection
import { connectDB } from "./lib/db.js";
//importing Routes
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statsRoutes from "./routes/stats.route.js";

// Configuring dotenv
dotenv.config();

const __dirname = path.resolve();//variable in File upload
const app = express();
const PORT = process.env.PORT || 4000;

// For Socket.io
const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(cors(
    {
        origin: "http://localhost:3000",
        // Allows cookies,authentication headers to be shared between frontend and backend
        credentials: true, 
    }
));

// To Parse req.body
app.use(express.json());

// To add auth in req obj => req.auth
app.use(clerkMiddleware());

//File Upload 
app.use(fileUpload(
    {
        useTempFiles: true,
        tempFileDir: path.join(__dirname, "tmp"),
        createParentPath: true,
        limits: {
            fileSize: 10 * 1024 * 1024
        } 
    }
));

// Cron jobs
// delete tmp files in every 1 hour
const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
    if(fs.existsSync(tempDir)){
        fs.readdir(tempDir, (err, files) => {
            if(err) {
                console.log("error" , err);
                return;
            }
            for(const file of files){
                fs.unlink(path.join(tempDir, file), (err) => {});
            }
        })
    }
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html" ))
    })
}

// Error handler
app.use((err, req, res, next) => {
    res.status(500).json(
        {
            message: process.env.NODE_ENV === "production" ?
                "Internal server Error" : err.message
        }
    );
});

// Lisening on Port
httpServer.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
    connectDB();
});