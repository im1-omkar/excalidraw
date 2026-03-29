import express from "express"
import authMiddleware from "../../middlewares/middleware.auth.js";

const roomRouter:express.Router = express.Router();

roomRouter.get("/create",authMiddleware,(req:express.Request,res:express.Response)=>{
    res.send(`HEllo there ${(req.body as any).userName}`)
})

export default roomRouter;
