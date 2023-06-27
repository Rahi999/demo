const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
});

const OtpAuth = mongoose.model('OtpAuth', otpSchema);

module.exports = OtpAuth;