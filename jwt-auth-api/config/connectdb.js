import mongoose from "mongoose";

const connectDB =  async (DATABASE_URL) => {
    console.log('Connecting to database...');
    try{
        const DB_OPTIONS = {
            dbName: "authDB",
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log('Connected to database');
    }catch(error){
        console.log(error);
    }
}

export default connectDB;