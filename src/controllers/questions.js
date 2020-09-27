import ErrorHandler from "../helpers/errhandler";
import SuccessHandler from "../helpers/sucessHandler";
import Question from "../model/Question";
import Grade from '../model/Grades';

const {
    successWithMessage,
    successWithData,
    successWithMessageAndData,
} = SuccessHandler;

const { serverResponse } = ErrorHandler;

const questionController = {
    loadQuestion: async (req, res) => {
        const incomingData = req.body
        try {
            const question = new Question(incomingData);
            await question.save();
            return successWithMessage(res, 201, "Question loaded");
        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },

    getQuestions: async ( req, res) =>{
        try {
            let count = await Question.countDocuments();
            let randomQuestions = Math.floor(Math.random() * count);
            let questionLength = await Question.countDocuments({}).limit(10);
            const questions = await Question.find()
            .skip(randomQuestions)
            .limit(10);
            return successWithData(res, 200, {
                questionLength,
                questions
            });
        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },

    submitQuestions: async (req, res) =>{
        try {
            const {answers, playerName} = req.body;
            let point = 0;
            let result = await Promise.all(
                answers.map( async(answer) =>{
                    let question = await Question.findOne({
                        _id : answer.questionId
                    });
                    if (!question) {
                        return Promise.reject("Invalid question answered");
                    }
                    if (question.correctAnswer == answer.answer) {
                        point += 10;
                        answer["correctAnswer"] = question.correctAnswer;
                        answer["pointAcquired"] = `${10}%`;
                        return Promise.resolve(answer);
                    }
                    point += 0;
                    answer["correctAnswer"] = question.correctAnswer;
                    answer["pointAcquired"] = `${0}%`;
                    return Promise.resolve(answer);
                })
            );
            let totalResult = {result, grade: `${point}%`};
            let validatePlayer = await Grade.findOne({ playerName });
            console.log(validatePlayer);
            if(validatePlayer){
                validatePlayer.grades.push(point);
                await validatePlayer.save();
            } else {
                let grades = point
                let gradeData = {playerName, grades};
                let newGrade = new Grade(gradeData);
                await newGrade.save();
            }
            successWithMessageAndData(
                res,
                200,
                "quiz has been marked",
                totalResult
            );
        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },

    getAllGrades: async (req, res) =>{
        try {
            const grades = await Grade.find({});
            let formatGrades = grades.map((grade)=>{
                let playerName = grade.playerName;
                let grades = grade.grades;
                return {playerName, grades};
            });
            return successWithData(res, 200, formatGrades);
        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    }
};



export default questionController;
