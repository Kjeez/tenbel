import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log('Server is not ready to take our messages:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body);
  const { firstName, lastName, company, email, interest, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    console.log('Validation failed: Missing required fields');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const toAddresses = process.env.EMAIL_TO || process.env.EMAIL_USER;
  console.log('Sending email to:', toAddresses);

  const mailOptions = {
    from: `"${firstName} ${lastName}" <${email}>`, // sender address
    to: toAddresses, // list of receivers (send to yourself)
    subject: `Website Contact Form: ${firstName} ${lastName} ${company ? `- ${company}` : ''}`, // Subject line
    text: `
Name: ${firstName} ${lastName}
Company: ${company || 'N/A'}
Email: ${email}
Interested In: ${interest || 'Not specified'}

Message:
${message}
    `, // plain text body
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Interested In:</strong> ${interest || 'Not specified'}</p>
      <br />
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `, // html body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
