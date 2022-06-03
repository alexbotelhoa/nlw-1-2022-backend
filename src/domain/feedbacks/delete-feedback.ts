import { FeedbacksRepository } from '../../repositories/feedbacks-repository';

export interface DeleteFeedbackRequest {
  id: string
}

export class DeleteFeedback {
  constructor(
    private feedbacksRepository: FeedbacksRepository
  ) {}

  async execute(request: DeleteFeedbackRequest) {
    const { id } = request

    if (!id) {
      throw new Error('All fields is required')
    }

    return await this.feedbacksRepository.delete({ id })
  }
}
