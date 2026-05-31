import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { firstName, lastName, company, email, interest, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const toAddresses = process.env.EMAIL_TO || process.env.EMAIL_USER;

  const mailOptions = {
    from: `"${firstName} ${lastName}" <${email}>`, // sender address
    to: toAddresses, // list of receivers
    subject: `Website Contact Form: ${firstName} ${lastName} ${company ? `- ${company}` : ''}`,
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
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
