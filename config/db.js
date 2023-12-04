import mongoose from "mongoose"
import colors from 'colors'
const connectDB= async()=>{
    try{
     const conn = await mongoose.connect(process.env.MONGO_URI);
     console.log(`Connected to MongoDB database ${mongoose.connection.host}`.bgMagenta.white)
    }
    catch(error){
        console.log(`Mongo error ${error}`.bgRed.white);
    }
}

export default connectDB;