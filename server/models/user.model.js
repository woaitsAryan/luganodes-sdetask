const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: { type: String }, // No longer required
    email: { type: String, unique: true },
    password: { type: String },
    address: { type: String },
    isMetamaskUser: { type: Boolean, default: false },
}, {
    collection: 'user-data'
})

const model = mongoose.model('UserData', User)

module.exports = model
