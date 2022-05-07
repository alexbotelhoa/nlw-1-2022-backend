import { MailAdapter } from './../../adapters/mail-adapter'
import { FeedbacksRepository } from './../../repositories/feedbacks-repository'

interface SubmitFeedbackRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbacks {
  constructor(
    private mailAdapter: MailAdapter,
    private feedbacksRepository: FeedbacksRepository
  ) {}

  async execute(request: SubmitFeedbackRequest) {
    const { type, comment, screenshot } = request

    if (!type || !comment) {
      throw new Error('All fields is required')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot formar')
    }

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback again',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : null,
        `</div>`
      ].join('\n')
    })

    return await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })
  }
}
