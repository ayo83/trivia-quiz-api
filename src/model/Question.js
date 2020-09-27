import mongoose from 'mongoose';
const {
    Schema
} = mongoose;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    options: [{
        label: {
            type: String,
            required: true,
            lowerCase: true
        },
        answer: {
            type: String,
            required: true,
            lowerCase: true
        }
    }],
    correctAnswer: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});


const Question = mongoose.model('Question', questionSchema);
export default Question;