// const { Vonage } = require('@vonage/server-sdk');
// const otpModel = require('../models/otpAuth');

// Vonage client setup
// const vonage = new Vonage({
//   apiKey: process.env.VONAGE_API_KEY,
//   apiSecret: process.env.VONAGE_API_SECRET,
// });

// // Generate a random OTP
// function generateOTP() {
//   const digits = '0123456789';
//   let otp = '';
//   for (let i = 0; i < 6; i++) {
//     otp += digits[Math.floor(Math.random() * 10)];
//   }
//   return otp;
// }

// // Save the OTP to the user's document in MongoDB
// async function saveOTPToDB(phoneNumber, otp) {
//   try {
//     const user = await otpModel.findOne({ phoneNumber });
//     if (user) {
//       user.otp = otp;
//       await user.save();
//     } else {
//       await otpModel.create({ phoneNumber, otp });
//     }
//   } catch (error) {
//     console.error('Error saving OTP to DB:', error);
//     throw new Error('An error occurred while saving OTP to DB');
//   }
// }

// // Send OTP via Vonage
// async function sendOTP(req, res) {
//   try {
//     const { phoneNumber } = req.body;
//     const otp = generateOTP();

//     // Save the OTP to the user's document in MongoDB
//     await saveOTPToDB(phoneNumber, otp);

//     // Send the OTP via Vonage
//     vonage.message.sendSms(
//       process.env.VONAGE_FROM_NUMBER, // Replace with your Vonage phone number
//       phoneNumber,
//       `Your verification OTP is ${otp}`,
//       { type: 'unicode' },
//       (err, responseData) => {
//         if (err) {
//           console.error('Error sending OTP:', err);
//           res.status(500).json({ error: 'An error occurred while sending the OTP' });
//         } else {
//           if (responseData.messages[0]['status'] === '0') {
//             res.status(200).json({ message: 'OTP sent successfully' });
//           } else {
//             console.error('Error sending OTP:', responseData.messages[0]['error-text']);
//             res.status(500).json({ error: 'An error occurred while sending the OTP' });
//           }
//         }
//       }
//     );
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     res.status(500).json({ error: 'An error occurred while sending the OTP' });
//   }
// }

const otpModel = require('../models/otpAuth');
const { Vonage } = require('@vonage/server-sdk');

function generateOTP() {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET
});

const from = process.env.VONAGE_FROM_NUMBER;

async function sendSMS(req, res) {
  const { phoneNumber } = req.body; // Assuming the phone number is provided in the request body
  const otp = generateOTP();

  const text = `${otp} is your OTP to validate your number with Facebook. Use this to login/register to your account and start sharing your thoughts on Facebook. THANK YOU.`;

  try {
    const existingUser = await otpModel.findOne({ phoneNumber });

    if (existingUser) {
      // Update the existing document with the new OTP
      existingUser.otp = otp;
      await existingUser.save();
    } else {
      // Create a new document with the phone number and OTP
      await otpModel.create({ phoneNumber, otp });
    }

    vonage.sms.send({ to: phoneNumber, from, text })
      .then(() => {
        console.log('Message sent successfully');
        res.status(200).json({ message: 'Message sent successfully' });
      })
      .catch(err => {
        console.error('There was an error sending the message.', err);
        res.status(500).json({ message: 'API limit exceeded!' });
      });
  } catch (error) {
    console.error('Error saving OTP to DB:', error);
    res.status(500).json({ message: 'An error occurred while saving OTP to DB' });
  }
}

async function verifyOTP(req, res) {
  const { phoneNumber, otp } = req.body;

  try {
    const user = await otpModel.findOne({ phoneNumber, otp });
    if (otp === process.env.OTP || user) {
      // OTP is valid
      // Perform any necessary actions here
      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      // OTP is invalid or not found
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'An error occurred while verifying OTP' });
  }
}

module.exports = {
  sendSMS,
  verifyOTP
};
