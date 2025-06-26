import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectdb=async()=>{
    try{

        const connectioninstance=await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);

        //to know which database u rconnected on 
        console.log(`\n mongodb connected !! DB HOST :${connectioninstance.connection.host}`)




    }catch(error){
        console.log("ERROR:",error);
        process.exit(1);
    }
}


export default connectdb;
// final db 