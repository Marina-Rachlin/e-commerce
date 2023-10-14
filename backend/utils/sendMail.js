import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';

dotenv.config();

const sendMail = async (options) => {

  const __dirname = path.resolve();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'), //default port for the Simple Mail Transfer Protocol (SMTP) 
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const { email, subject, template, data } = options;

  // Get the path to the email template file
  const templatePath = path.join(__dirname, './mails', template);

  // Render the email template with EJS
  const html = await ejs.renderFile(templatePath, data);//await because it takes time to read the file and render it

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;
