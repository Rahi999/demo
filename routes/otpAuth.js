const express = require('express');
const {sendSMS, verifyOTP} = require("../controllers/otpAuth");
const otpRouter = express.Router()

otpRouter.post('/send-otp', sendSMS);
otpRouter.post('/verify', verifyOTP)

module.exports = {otpRouter}