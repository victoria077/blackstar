const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const notesRouter = require("./notesRouter");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
const cors = require("cors");
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/", notesRouter);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vikslepchenko:clever007@cluster0.dfrm3rw.mongodb.net/?retryWrites=true&w=majority"
    );
    http.listen(PORT, () => {
      console.log(`Server started om port ${PORT}`);
      io.on("connection", function (socket) {
    
        socket.on("messageSent", function (message) {
          socket.broadcast.emit("messageSent", message)
        });
      });
    });
  } catch (e) {
    console.log(e);
  }
};

start();
