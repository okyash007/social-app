import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { Server } from "socket.io";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    const server = app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });

    const io = new Server(server, {
      pingTimeout: 60000,
      cors: {
        origin: ["http://localhost:5173", "https://gitsta-frontend.vercel.app"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      socket.on("join_room", (room) => {
        socket.join(room);
        console.log(`user joinded ${room}`);
      });

      socket.on("send_message", (data) => {
        // console.log(data)
        socket.to(data.room).emit("receive_message", data.message);
      });
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
