import Users from "@repo/backend-common/model";
import express from "express";
import jwt from "jsonwebtoken"

const authRouter:express.Router = express.Router();
const JWT_SECRET:any = process.env.JWT_SECRET 

authRouter.post("/signup",async (req:express.Request, res:express.Response)=>{
    //take out the body -> userName , email and password
    const userName:string = (req.body as any).userName;
    const email:string = (req.body as any).email;
    const password:string = (req.body as any).password;

    try{
        
        //check if the email already exists -> else send back error
        const findUser = await Users.find({"email":email});

        if(findUser.length != 0){
            console.log(findUser);
            res.send("email already exists");
            return;
        }

        //insert the email inside the DB -> else send back error
        const enteredUser = await Users.create({"userName":userName,"email":email,"password":password});

        //return the success-message
        res.json({
            "success":"true",
            "data":enteredUser,
            "error":false
        })

    }catch(err){

        console.log("error while sigingup : " + err);
        res.send("internal server error");
    }
})

authRouter.post("/signin",async (req:express.Request, res:express.Response)=>{
    //take out the body -> email, password
    const email:string = (req.body as any).email
    const password:string = (req.body as any).password

    try{
        
        //search in DB with given email 
        const search:any = await Users.findOne({"email":email});

        if(search.length == 0){
            res.send("email don't exist");
            return;
        }
        //check the password with given password

        if(search.password != password){
            console.log(search)
            console.log(search.password, password);
            res.send("invalid password");
            return;
        }
        

        //if success -> generate a token -> return the token (token contains : email and username)
        const token = jwt.sign({"userName":search.userName,"email":email},JWT_SECRET)

        res.json({
            "successs":"true",
            "data":{
                "userName":search.userName,
                "email":search.email,
                "token":token
            }
        })

    }
    catch(err){
        res.send("error while signing-in: " + err);
        return;
    }

})

export default authRouter;
