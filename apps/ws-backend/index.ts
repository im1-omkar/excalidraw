import url from "url"
import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken"
import jwt_secret from "@repo/backend-common/variables"

console.log(jwt_secret)
const wss = new WebSocketServer({port:8080})

const rooms = {}
const objects = {}

wss.on("connection",(ws, request)=>{

    ws.on("error",console.error)

    ws.on("message",(message:any)=>{

        if(message.type == "create"){
            //add the object in DB
            //add the object in objects

            //send the updated object to everyone
        }

    })

    try{
        const headers = request.headers;
        const token:any = headers["token"]
        const decoded:any= jwt.verify(token,jwt_secret)

        ws.send(`Hello ${decoded.userName} from Server`)
        return;

    }
    catch(err){
        ws.send("unauthorized token")
        return
    }

})
