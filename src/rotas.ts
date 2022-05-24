import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import express from 'express';

import { SubmitFeedbacks } from './domain/feedbacks/submit-feedback';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

  const submitFeedbacks = new SubmitFeedbacks(
    nodemailerMailAdapter,
    prismaFeedbacksRepository,
  );

  const feedback = await submitFeedbacks.execute({
    type,
    comment,
    screenshot,
  })

  return res.status(201).json({ data: feedback });
});
