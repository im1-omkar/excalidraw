import express from "express";
import authRouter from "./src/modules/api.auth/routes.js";
import roomRouter from "./src/modules/api.room/routes.js";
import connectDB from "@repo/backend-common/db"
import User from "@repo/backend-common/model"

const app = express();

connectDB();


app.use(express.json())

app.use("/api/auth",authRouter);
app.use("/api/room",roomRouter);

app.get("/",async (req:express.Request, res:express.Response)=>{
    res.send("Hello from home route");
})

app.listen(3001,()=>{
    console.log("http-server is running on PORT : 3001");
})
