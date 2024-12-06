const { Server } = require("socket.io");

const onlineusers = [];

const addUser = (user) => {
  onlineusers.push(user);
};
function socketInit(server) {
  console.log(server);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connect", (socket) => {
    console.log("A user connected --->", socket.id);

    socket.on("ADD_USER", (data) => {
      addUser(data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  console.log("Socket.IO initialized", server);
}

module.exports = socketInit;
