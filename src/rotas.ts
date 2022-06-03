import express from 'express';

import { FeedbackController } from './controllers/feedback.controller';

export const routes = express.Router();

routes.get('/feedbacks', FeedbackController().selectFeedback);
routes.post('/feedbacks', FeedbackController().createFeedback);
routes.delete('/feedbacks/:id', FeedbackController().deleteFeedback);
