const mongoose = require("mongoose")

const chatSchema = mongoose.Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    message: { type: String, required: true },
    time: {type: String, required: true}
  });
  
  const chatModel = mongoose.model('Chat', chatSchema);

 module.exports = {chatModel, chatSchema}