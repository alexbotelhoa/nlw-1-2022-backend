import express from 'express';

import { FeedbackController } from './controllers/feedback.controller';

export const routes = express.Router();

routes.get('/feedback', FeedbackController().selectFeedback);
routes.post('/feedback', FeedbackController().createFeedback);
routes.delete('/feedback/:id', FeedbackController().deleteFeedback);
