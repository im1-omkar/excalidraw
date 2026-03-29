import express from "express";
import jwt from "jsonwebtoken"

const authRouter:express.Router = express.Router();
const JWT_SECRET:any = process.env.JWT_SECRET 

authRouter.post("/signup",(req:express.Request, res:express.Response)=>{
    //take out the body -> userName , email and password
    const userName:string = (req.body as any).userName;
    const email:string = (req.body as any).email;
    const password:string = (req.body as any).password;

    //check if the email already exists -> else send back error

    //insert the email inside the DB -> else send back error

    //return the success-message
    res.json({
        "success":"true",
        "data":{
            "email":email,
            "userName":userName
        },
        "error":false
    })
})

authRouter.post("/signin",(req:express.Request, res:express.Response)=>{
    //take out the body -> email, password
    const email:string = (req.body as any).email
    const password:string = (req.body as any).password

    //search in DB with given email 
    //check the password with given password

    //if success -> generate a token -> return the token (token contains : email and username)
    const token = jwt.sign({"email":email},JWT_SECRET)

    res.json({
        "successs":"true",
        "data":{
            "userName":"user",
            "email":email,
            "token":token
        }
    })

})

export default authRouter;
