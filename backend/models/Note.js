import  mongoose  from "mongoose";

const notesSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    content:{
        type: String,
        required: true
    }
},{timestamps:true})

const notes = mongoose.model('notes', notesSchema)
export default notes