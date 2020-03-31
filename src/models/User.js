const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose

const UserSchema = new Schema({
  email: { type: String, required: [true, "can't be blank"], validate: [ validator.isEmail, 'invalid email' ] },
  name: { type: String, required: [true, "can't be blank"] },
  externalId: { type: String, required: [true, "can't be blank"] },
  provider: { type: String, required: [true, "can't be blank"] }
}, { timestamps: true })

UserSchema.index({ externalId: 1 }, { unique: true })

const User = mongoose.model('User', UserSchema)

module.exports = User
