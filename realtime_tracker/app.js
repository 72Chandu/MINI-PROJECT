const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io'); // Run on http server

const server = http.createServer(app);
const io = socketIo(server);

const path = require('path');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket) {
    console.log("someone connected!");

    socket.on("send-location", function(data) { // Socket receives location data from frontend
        io.emit("receive-location", { id: socket.id, ...data }); // Emit location data to frontend
    });

    socket.on("disconnect", function() {
        io.emit("user-disconnected", socket.id); // Notify frontend of disconnection
    });
});

app.get("/", function(req, res) {
    res.render("index");
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
