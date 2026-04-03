import express from "express"
import authMiddleware from "../../middlewares/middleware.auth.js";
import models from "@repo/backend-common/model";
import mongoose from "mongoose";

const roomRouter:express.Router = express.Router();

roomRouter.get("/rooms",authMiddleware, async(req:express.Request, res:express.Response)=>{
    
    //get all the roomIds and slaga

    try{
        const result = await models.Rooms.find({});

        res.json({
            "success":true,
            "data":result
        })
    }
    catch(err){
        console.log("error while finding rooms");
        res.send("internal server error");
        return;
    }

})

const isUnique = async (randomId:number)=>{
    const result:any = await models.Rooms.findOne({roomId:randomId})

    if(result == null){
        return true;
    }
    else{
        return false
    }

}

roomRouter.post("/create",authMiddleware,async (req:express.Request,res:express.Response)=>{

    if(req.body.slag == null || req.body.slag == undefined){
        res.send("invalid body");
        return;
    }

    //generate a randomNumber of 3 digits
    let randomId:any = null;
    try{
        let attempt = 0
        while(attempt < 10){
            randomId = Math.floor(Math.random()*1000);
            if(await isUnique(randomId)) break;
            attempt++;
        }
    }
    catch(err){
        console.log("error while generating number");
        res.json("internal server error");
        return;
    }

    
    //create a room {roomId:req.params.id, slag:req.body.slag}
    try{
        const result = await models.Rooms.create({
            "roomId":randomId,
            "slag":req.body.slag
        })

        // return the entire object of room
        res.json({
            success:true,
            data:result
        })
    }
    catch(err){
        console.log("erorr while creating room: " + err);
        res.send("internal server error");
        return;
    }
    
})

roomRouter.get("/:id",authMiddleware, async(req:express.Request, res:express.Response)=>{
    
    try{
        
        const result = await models.Messages.find({"roomId":Number(req.params.id)})

        res.json({
            "success":true,
            "data":result
        })

    }catch(err){
        console.log("errror while getting the message");
        res.send("internal server error");
        return;
    }

})

export default roomRouter;
