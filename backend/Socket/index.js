const { Server } = require("socket.io");
const { savemsg, getPastMessages } = require("../controllers/message");
const path = require("path");
const fs = require("fs");

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

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Directory created: ${dirPath}`);
  }
};

const extractBase64Data = (base64String) => {
  const match = base64String.match(/^data:(.+);base64,(.+)$/);
  if (match) {
    return {
      mimeType: match[1],
      base64Content: match[2],
    };
  }
  return null;
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

    socket.on("UPDATE_READ", (msg) => {
      io.emit("UPDATE_READ", msg);
    });

    socket.on("SEND_MSG", (msg) => {
      // Check if there's an image in the message
      if (msg.image && msg.image.length > 0) {
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
        // Extract MIME type and base64 content from the image
        const base64Data = extractBase64Data(msg.image);

        if (base64Data) {
          const { mimeType, base64Content } = base64Data;
          console.log("Mime Type:", mimeType);

          // Determine file extension based on MIME type
          const extension = mimeType.split("/")[1]; // Extract "png", "jpeg", etc.
          const imageFileName = `${Date.now()}_image.${extension}`;

          const uploadsDir = path.join(__dirname, "../uploads");

          // Ensure the uploads directory exists
          ensureDirectoryExists(uploadsDir);

          const imagePath = path.join(uploadsDir, imageFileName);
          console.log("Saving image to:", imagePath);

          // Convert base64 string to a Buffer
          const imageBuffer = Buffer.from(base64Content, "base64");

          // Write the image to disk using async/await
          fs.writeFile(imagePath, imageBuffer, (err) => {
            if (err) {
              console.error("Error saving image:", err);
              return;
            }

            console.log("Image saved successfully at:", imagePath);

            // Save the relative path to the image (relative to the 'uploads' folder)
            const relativeImagePath = "uploads/" + imageFileName;
            msg.image = relativeImagePath;

            console.log("image path:", msg.image);
            // Emit the updated message to the receiver
            socket.to(msg.receiver.socketId).emit("RECEIVE_MSG", msg);

            // Save the message to the database
            savemsg(msg)
              .then((res) => {
                io.emit("SavedDB_message", res);
              })
              .catch((err) => {
                console.log("Error saving message to DB:", err);
              });
          });
        } else {
          msg.image = "";
          console.log(
            "The image string does not match the expected base64 format."
          );
        }
      } else {
        // If no image, just emit the message as is
        socket.to(msg.receiver.socketId).emit("RECEIVE_MSG", msg);
        savemsg(msg)
          .then((res) => {
            io.emit("SavedDB_message", res);
          })
          .catch((err) => {
            console.log("Error saving message to DB:", err);
          });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
      removeuser(socket.id);
      io.emit("USER_ADDED", onlineusers);
    });
  });
}

module.exports = socketInit;
