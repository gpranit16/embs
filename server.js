import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, query } = req.body;

  if (!name || !email || !query) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email to the admin with the user's query
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Query from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nQuery:\n${query}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Query:</strong></p><p>${query.replace(/\n/g, '<br/>')}</p>`,
    });

    // Send auto-reply to the user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Message Received - IEEE EMBS',
      text: `Hello ${name},\n\nThanks, we will reach you shortly.\n\nBest Regards,\nIEEE EMBS Team`,
      html: `<p>Hello ${name},</p><p>Thanks, we will reach you shortly.</p><p>Best Regards,<br/>IEEE EMBS Team</p>`,
    });

    res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
