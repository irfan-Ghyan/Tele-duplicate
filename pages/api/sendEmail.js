

import { transporter } from '../../app/lib/nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Request Body:', req.body); 

    const { firstName, lastName, email, phone, submitTime, submitDate } = req.body;

    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required' , body: req.body});
    }

    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,  
        subject: 'Form Submission Received', 
        text: `Hello ${firstName} ${lastName},\n\nWe have received your form submission.\n\nDetails:\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nSubmitted at: ${submitTime} ${submitDate}`, 
      };

    await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

