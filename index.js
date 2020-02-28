const express = require('express');
const socket = require('socket.io');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const port = process.env.PORT || 4000;

const app = express();

const server = app.listen(port, () => {
    console.log("Listening to request on port 4000");
});

app.use(express.static("public"));

const io = socket(server);

io.on("connection", (socket) => {
    console.log("made socket connection", socket.id);
    socket.on("chat", (data) => {
        io.sockets.emit("chat", data);
    });
});
