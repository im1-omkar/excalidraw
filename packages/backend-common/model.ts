import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    userName:String,
    email:String,
    password:String
})

const Users =  mongoose.model("Users",userSchema);

const roomSchema = new mongoose.Schema({
    roomId:{
        type:Number,
        unique:true
    },
    slag:String
})

const Rooms = mongoose.model("Rooms", roomSchema);

const messageSchema = new mongoose.Schema({
    roomId: {
        type:Number,
        unique:true
    },
    message:String,
    createdAt: {
        type:Date
    }
})

const Messages = mongoose.model("Messages", messageSchema)

const models = {
    Users,
    Rooms,
    Messages
}

export default models;