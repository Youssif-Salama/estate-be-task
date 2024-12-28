import mongoose from "mongoose";

const connection=()=>{
  const conn=mongoose.connect(process.env.MONGO_URL);
  return conn;
}


export default connection;