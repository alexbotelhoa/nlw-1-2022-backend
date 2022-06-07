import { prisma } from '../../prisma';
import { 
  FeedbacksRepository,
  FeedbackResponse,
  FeedbackCreate,
  FeedbackDelete } from './../feedbacks-repository';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async select() {
    return await prisma.feedback.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    }) as FeedbackResponse[];
  }

  async create({ type, comment, screenshot }: FeedbackCreate) {
    return await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      }
    }) as FeedbackResponse;
  }

  async delete({ id }: FeedbackDelete) {
    return await prisma.feedback.delete({
      where: {
        id
      }
    }) as FeedbackResponse;
  }
}
