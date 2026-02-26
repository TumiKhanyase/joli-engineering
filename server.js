import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
       /*user: 'tumirazor112@gmail.com',
        pass: 'tqpxefurokywbdew'*/
    }
});

app.post('/send-email', async (req, res) => {
    const { firstname, lastname, email, message } = req.body;

    const mailOptions = {
        from: 'tumirazor112@gamil.com',
        to: 'tumikhanyase119@gmail.com',  // Change this to the target email
        subject: 'New Form Submission',
        text: `Name: ${firstname} ${lastname}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Email failed to send.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
