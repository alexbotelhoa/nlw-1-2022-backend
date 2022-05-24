import nodemailer from 'nodemailer';

import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e1ccc56d87395c",
    pass: "d0c65cf4dc5355"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@gmail.com>',
      to: 'Alex Botelho <alexbotelhoa@gmail.com>',
      subject,
      html: body
    }) 
  };
}
