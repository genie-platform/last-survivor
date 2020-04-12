const mongoose = require('mongoose')
const { Schema } = mongoose

const UserStateSchema = new Schema({
  guess: { type: Number },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, "can't be blank"] },
  round: { type: Schema.Types.ObjectId, ref: 'Round', required: [true, "can't be blank"] },
  isWinner: { type: Boolean }
}, { timestamps: true })

const UserState = mongoose.model('UserState', UserStateSchema)

module.exports = UserState
