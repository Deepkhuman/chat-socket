const express = require("express");
const router = require("./routes/auth");
const app = express();
const cors = require("cors");
const { ConnectDb } = require("./DB/db");
require("dotenv").config();
const chatRouter = require("../backend/routes/Chat");
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);

const socketInit = require("./Socket/index");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

ConnectDb();

app.use("/api", router);

router.use("/", chatRouter);

const Port = process.env.PORT || 3000;

socketInit(httpServer);

httpServer.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
