import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
      await mongoose.connect(process.env.MONGO_URI)
      console.log("Db connected successfully");
      
    } catch (error) {
      console.log(error);
      process.exit(1)  //exit with failure
    }
  }


  //mongodb+srv://neupanen494_db_user:c7-X%LrCY*T.D_e@cluster0.9xhrnth.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Cluster0  //url of mongodb atlas