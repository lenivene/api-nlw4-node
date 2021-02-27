import nodemailer, { Transporter } from "nodemailer";
import { ParseTemplate } from "../utils/ParseTemplate";

class SendMailService{
  private client: Transporter;

  constructor(){
    (async () => {
      const {user, pass} = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: { user, pass },
      });

      this.client = transporter;
    })();

  }

  async execute(to: string, subject: string, data: any, ...pathTemplate: string[]){
    const mainTemplateContent = ParseTemplate(data, ...["emails", ...pathTemplate])

    const message = await this.client.sendMail({
      from: '"No Reply" <noreply@example.com>', // sender address
      to,
      subject,
      html: mainTemplateContent
    });

    console.log("Message sent: %s", message.messageId);
    // Message sent: <[email protected]>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export const sendMailService = new SendMailService();
