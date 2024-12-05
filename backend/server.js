const express = require("express");
const router = require("./routes/auth");
const app = express();
const cors = require("cors");
const { ConnectDb } = require("./DB/db");
app.use(cors());
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const Port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

ConnectDb();

app.use("/api", router);

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
