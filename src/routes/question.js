import { Router } from 'express';
import questionController from '../controllers/questions';

const route = Router();
export default (app) =>{
    app.use('/question', route);

    route.post('/load-question', questionController.loadQuestion);

    route.get('/questions', questionController.getQuestions);

    route.post('/submit', questionController.submitQuestions);

    route.get('/grades', questionController.getAllGrades);
}