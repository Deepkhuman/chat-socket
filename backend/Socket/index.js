const { Server } = require("socket.io");
const { savemsg, getPastMessages } = require("../controllers/message");

const onlineusers = [];

const addUser = (user, socketId) => {
  const Isexists = onlineusers.findIndex((item) => item.id === user.id);
  if (Isexists !== -1) {
    onlineusers.splice(Isexists, 1);
  }
  user.socketId = socketId;
  onlineusers.push(user);
};

const removeuser = (socketId) => {
  const Isexists = onlineusers.findIndex((item) => item.socketId === socketId);
  if (Isexists !== -1) {
    onlineusers.splice(Isexists, 1);
  }
};
function socketInit(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected --->", socket.id);

    socket.on("ADD_USER", (data) => {
      addUser(data, socket.id);
      io.emit("USER_ADDED", onlineusers);
    });

    socket.on("SEND_MSG", (msg) => {
      console.log("--=-=-=-=-", msg);
      socket.to(msg.receiver.socketId).emit("RECEIVE_MSG", msg);

      const send = savemsg(msg);
      send
        .then((res) => {
          io.emit("SavedDB_message", res);
        })
        .catch((err) => console.log("Error from SEND_MSG", err));
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
      removeuser(socket.id);
      io.emit("USER_ADDED", onlineusers);
    });
  });
}

module.exports = socketInit;
