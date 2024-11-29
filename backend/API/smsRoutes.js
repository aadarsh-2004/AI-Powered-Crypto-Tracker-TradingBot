// smsRoutes.js
const express = require('express');
const twilio = require('twilio');
require('dotenv').config();

const router = express.Router();

// Twilio Credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;  // Replace with your Twilio Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // Replace with your Twilio Auth Token
const twilioPhone = '+19787375069'; // Replace with your Twilio phone number

const client = twilio(accountSid, authToken);

// Route to Send SMS
router.post('/send-notification', async (req, res) => {
  const { phoneNumber, message } = req.body; 
  console.log('SMS sent :'); // Get user phone number and message from the request

  if (!phoneNumber || !message) {
    return res.status(400).json({ error: 'Phone number and message are required' });
  }

  try {
    // Send SMS
    const response = await client.messages.create({
      body: message,
      from: twilioPhone,
      to: phoneNumber,
    });

    res.status(200).json({ success: true, sid: response.sid });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ error: 'Failed to send SMS notification' });
  }
});

module.exports = router;
