const mongoose = require('mongoose')
const { Schema } = mongoose

const UserStateSchema = new Schema({
  guess: { type: Number, required: [true, "can't be blank"] },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  round: { type: Schema.Types.ObjectId, ref: 'Round' }
}, { timestamps: true })

const UserState = mongoose.model('UserState', UserStateSchema)

module.exports = UserState
