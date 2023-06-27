const mongoose = require("mongoose")

const AuthdemoSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: Number, required: true}
})

const authdemoModel = mongoose.model('authDemo', AuthdemoSchema);
module.exports = {AuthdemoSchema, authdemoModel}