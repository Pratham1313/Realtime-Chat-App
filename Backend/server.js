import express from "express";
import connect_mongo from "./connection/connection.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import Authroutes from "./routes/Authroutes.js";
import Messageroutes from "./routes/messageRoutes.js";
import userroutes from "./routes/user.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
app.use(cors());

app.use(express.json()); //to parse incoming req.body(JSON)
app.use(cookieParser());
app.use("/api/auth/", Authroutes);
app.use("/api/message/", Messageroutes);
app.use("/api/user/", userroutes);

server.listen(5000, () => {
  console.log("Server Started");
  connect_mongo();
});
