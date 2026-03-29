import jwt from "jsonwebtoken";
import express from "express"

const JWT_SECRET:any = process.env.JWT_SECRET

const authMiddleware = async(req:express.Request, res:express.Response, next:express.NextFunction)=>{
    //take out the token 
    const bearerToken:any = req.headers.authorization;
    const token = bearerToken.split(" ")[1]
    console.log(token)

    try{
        //decode it (email, userName)
        const decoded:any = jwt.verify(token, JWT_SECRET);

        (req.body as any).email = decoded.email;
        (req.body as any).email = decoded.userName;
        
        //find the given email in the DB -> if it exists then good to go
        if (decoded.email == "omkar@gmail.com"){
            next();
            return;
        }

        res.send("unauthenticatited -- illegal")
    }
    catch(err){
        console.log("error in middleware: " + err);
        res.send("error in middleware")
    }

}

export default authMiddleware;
