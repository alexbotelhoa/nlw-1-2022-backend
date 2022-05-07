import { SubmitFeedbacks } from './submit-feedback'

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe('Submit feedback', () => {
  const submitFeedback = new SubmitFeedbacks(
    { sendMail: createFeedbackSpy },
    { create: sendMailSpy }
  )

  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'exemple comment',
        screenshot: 'data:image/png;base64,asdolsadlkajslkd'
      })
    ).resolves.not.toThrow()

    expect(sendMailSpy).toHaveBeenCalled();
    expect(createFeedbackSpy).toHaveBeenCalled();
  })

  it('should not be able to submit a feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'exemple comment',
        screenshot: 'data:image/png;base64,asdolsadlkajslkd'
      })
    ).rejects.toThrow()
  })

  it('should not be able to submit a feedback without screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'exemple comment',
        screenshot: 'test.jpg'
      })
    ).rejects.toThrow()
  })
})
