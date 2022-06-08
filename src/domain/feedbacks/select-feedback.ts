import { FeedbacksRepository } from '../../repositories/feedbacks-repository';

export class SelectFeedbacks {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
  ) {}

  async execute() {
    return await this.feedbacksRepository.select();
  }
}
