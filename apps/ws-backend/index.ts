import url from "url"
import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken"
import jwt_secret from "@repo/backend-common/variables"

console.log(jwt_secret)
const wss = new WebSocketServer({port:8080})

wss.on("connection",(ws, request)=>{

    ws.on("error",console.error)

    ws.on("message",(message)=>{
        console.log(message.toString());
        ws.send("this is your reply");
    })

    const headers = request.headers;

    const token:any = headers["token"]
    console.log(token)

    try{
        const decoded = jwt.verify(token,jwt_secret)

        ws.send("hello from the server")
        return;
    }
    catch(err){
        ws.send("unauthorized token")
        return
    }

})
