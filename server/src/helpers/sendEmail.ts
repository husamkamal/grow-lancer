import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const sendEmail = (userEmail: string, username: string, jobTitle: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'glancerUser@gmail.com',
    to: userEmail,
    subject: 'Glancer platform: Your proposal is accepted',
    html: `<div>Hi ${username}, <br>Thank you so much for taking time to apply to <b>${jobTitle} </b>
     We are happy to let you know that your proposal have been accepted.<br>
     Congratulations on this achievement!<br>
    check your account in Glancer for more information<br>
    Good luck,<br>
    Glancer Team
    </div> `,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    } else {
      return '';
    }
  });
};

export default sendEmail;
