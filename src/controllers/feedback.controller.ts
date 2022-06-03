import { CreateFeedback } from '../domain/feedbacks/create-feedback';
import { DeleteFeedback } from '../domain/feedbacks/delete-feedback';
import { SelectFeedbacks } from '../domain/feedbacks/select-feedback';
import { NodemailerMailAdapter } from './../adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './../repositories/prisma/prisma-feedbacks-repository';

interface IController {
  selectFeedback(): Promise<void>;
  createFeedback(red: any, res: any): Promise<void>;
}

export function FeedbackController() {
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

  const selectFeedback = async (req: any, res: any): Promise<IController> => {
    const selectFeedback = new SelectFeedbacks(
      prismaFeedbacksRepository,
    );

    const feedbacks = await selectFeedback.execute();
  
    return res.status(201).json({ data: feedbacks });
  }

  const createFeedback = async (req: any, res: any): Promise<IController> => {
    const { type, comment, screenshot } = req.body;

    if (!type || !comment) {
      return res.status(400).json({ message: "Request error" });
    }
  
    const createFeedback = new CreateFeedback(
      nodemailerMailAdapter,
      prismaFeedbacksRepository,
    );
  
    const feedback = await createFeedback.execute({
      type,
      comment,
      screenshot,
    })
  
    return res.status(201).json({ data: feedback });
  }
  
  const deleteFeedback = async (req: any, res: any): Promise<IController> => {
    const { id } = req.params;

    const deleteFeedback = new DeleteFeedback(
      prismaFeedbacksRepository,
    );

    const feedback = await deleteFeedback.execute({
      id
    });
  
    return res.status(201).json({ data: feedback });
  }

  return { selectFeedback, createFeedback, deleteFeedback };
}