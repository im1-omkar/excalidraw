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
        //parse the message to json
        const data = JSON.parse(message.toString());

        /**there is vernability that we are taking roomId from the user itself -- which we should get ourself */
        

        if(data.type == "message"){
            const room = rooms[data.roomId]
            console.log("1")

            //enter the data in database
            try{
                console.log("2")
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
        const headers = request.headers;
        const token:any = headers["token"]
        const decoded:any= jwt.verify(token,jwt_secret)
        const roomId:any = parsedUrl.query.roomId;

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
