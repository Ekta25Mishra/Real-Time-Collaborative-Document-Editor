require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);

// 🔥 SOCKET SETUP
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  socket.on("join-document", (docId) => {
    socket.join(docId);
  });

  socket.on("send-changes", ({ docId, title, content }) => {
    socket.to(docId).emit("receive-changes", { title, content });
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});