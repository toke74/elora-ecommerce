import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";
require("dotenv").config();

interface IEmailOptions {
  email: string;
  subject: string;
  name: string;
  message: any;
  html?: HTMLElement;
  ejsUrl?: string;
}

const transporter: Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async (options: IEmailOptions): Promise<void> => {
  const { email, subject, message, name, ejsUrl } = options;

  // const actCode = data.activationCode;
  // const name = data.name;

  //ejs file directory
  ejs.renderFile(
    path.join(__dirname, `../mails/${ejsUrl}`),
    { email, message, name },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const mailOptions = {
          from: process.env.SMTP_MAIL,
          to: email,
          subject,
          html: data,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log(`Email sent successful to ${email} `);
        });
      }
    }
  );
};
export default sendEmail;
