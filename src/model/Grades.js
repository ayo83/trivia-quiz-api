import mongoose from 'mongoose';
const {
    Schema
} = mongoose;

const gradeSchema = new Schema({
    playerName: String,
    grades:Array
}, {timestamps: true});

const Grade = mongoose.model('Grade', gradeSchema);
export default Grade;