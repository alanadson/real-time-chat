const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const { users, addUser, removeUser } = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// pulling front-end
app.use(express.static(path.join(__dirname, "public")));

const botName = "bot";

// Client connection
io.on("connection", (socket) => {
  console.log("😀New Web Socket connection...");

  socket.on("join_room", ({ username, room }) => {
    // const user = userJoin(socket.id, username, room);
    addUser({ id: socket.id, username, room });

    socket.join(room);

    // welcome to hom to connect(less for the own)
    socket.emit("message", formatMessage(botName, "Bem vindos ao Chat😁"));

    // when a users connect to the server
    socket.broadcast
      .to(room)
      .emit("message", formatMessage(botName, `${username} entrou no chat`));
  });

  // io.emit (for all users)

  // listen for chatMessage
  socket.on("chat_message", (event) => {
    const { msg } = JSON.parse(event);
    const user = users[socket.id];

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Client disconnect
  socket.on("disconnect", () => {
    const user = users[socket.id];

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} se desconectou`)
      );
    removeUser({ id: socket.id });
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`🚀Server running at ${PORT}`));
