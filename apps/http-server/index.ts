import express from "express";
import authRouter from "./src/modules/api.auth/routes.js";
import roomRouter from "./src/modules/api.room/routes.js";
import { json } from "node:stream/consumers";

const app = express();

app.use(express.json())

app.use("/api/auth",authRouter);
app.use("/api/room",roomRouter);

app.listen(3001,()=>{
    console.log("http-server is running on PORT : 3001");
})
