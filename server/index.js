import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();
const PORT = 4000;

const httpServer = http.createServer(app);
const io = new Server(httpServer);

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  // res.json({ data: "hello world from socket" });
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Connection is ready");
});

httpServer.listen(PORT, () => {
  console.log("Server is running at http://localhost:4000");
});
