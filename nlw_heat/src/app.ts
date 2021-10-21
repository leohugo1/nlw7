import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { router } from "./routes";
import { Server, Socket } from "socket.io";

const app = express();
app.use(cors())
const serverhttp = http.createServer(app);

const io = new Server(serverhttp, {
    cors: {
        origin: "*"
    }
});

io.on("connection", Socket => {
    console.log(`usuario conectado no socket ${Socket.id}`)
})

app.use(express.json())
app.use(router);


app.get('/github', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})
app.get('/signin/callback', (req, res) => {
    const { code } = req.query;
    return res.json(code);
})

export { serverhttp, io }