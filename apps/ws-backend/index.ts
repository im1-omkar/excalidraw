import url from "url"
import WebSocket, { RawData, WebSocketServer } from "ws";
import jwt from "jsonwebtoken"
import jwt_secret from "@repo/backend-common/variables"
import models from "@repo/backend-common/model";

const wss = new WebSocketServer({port:8080})

const rooms:any = {}

wss.on("connection",async(ws, request:any)=>{

    const parsedUrl = url.parse(request.url, true);

    ws.on("error",console.error)

    ws.on("message",async (message:RawData)=>{
        //parse the message to json -> check for error while parsing
        let data:any = null
        try{
             data = JSON.parse(message.toString());
        }
        catch(err){
            ws.send("invalid message format");
            return;
        }

        /**there is vernability that we are taking roomId from the user itself -- which we should get ourself */
        

        if(data.type == "message"){
            const room = rooms[data.roomId]

            //enter the data in database
            try{
                const result = await  models.Messages.create({
                    roomId:data.roomId,
                    message:data.message,
                    createdAt: new Date()
                })

                console.log(result);
                console.log("3")

            }catch(err){
                console.log("error while entering messages in DB : " + err);
            }

            room.forEach((ws:WebSocket) =>{ ws.send(data.message)})
        }

    })

    ws.on("close",()=>{
        //delete the user from record if he left the connection
    })

    try{
       
        const token:any = parsedUrl.query.token;
        const roomId:any = parsedUrl.query.roomId;
        const decoded:any= jwt.verify(token,jwt_secret)

        ws.send(`Hello ${decoded.userName} from Server`)

        if(rooms[String(roomId)] == null){
            rooms[String(roomId)] = []
        }

        rooms[String(roomId)].push(ws);

        ws.send("you joined server : " + roomId);

        
        return;

    }
    catch(err){
        ws.send("unauthorized token: " + err)
        ws.close();
        return
    }

})
