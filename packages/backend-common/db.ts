import mongoose from "mongoose"

console.log(process.env.DB_PASS!)

const connectDB = async()=>{
    
    try{
        await mongoose.connect(process.env.DB_PASS!)

        console.log("DB connected successfully")
    }
    catch(err){
        console.log("error while connecting to dbb" + err)
    }
}

export default connectDB;