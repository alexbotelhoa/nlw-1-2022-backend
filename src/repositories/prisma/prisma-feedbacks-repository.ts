import { prisma } from '../../prisma';
import { FeedbacksRepository, FeedbackCreateData, FeedbackResponse } from './../feedbacks-repository';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    return await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      }
    }) as FeedbackResponse;
  }
}
