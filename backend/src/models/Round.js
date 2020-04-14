const mongoose = require('mongoose')
const config = require('config')
const humanInterval = require('human-interval')
const { Schema } = mongoose

const RoundSchema = new Schema({
  startingAt: { type: Date, required: [true, "can't be blank"] },
  endingAt: { type: Date, required: [true, "can't be blank"] },
  winnerId: { type: String },
  reward: { type: String },
  guess: { type: Number },
  isDone: { type: Boolean, default: false }
}, { timestamps: true })

RoundSchema.statics.createRound = function (startingAt, cb) {
  return new Round({
    startingAt,
    endingAt: new Date(startingAt.getTime() + Round.getRoundInterval())
  }).save(cb)
}

RoundSchema.statics.getRoundInterval = function (cb) {
  return humanInterval(config.get('rounds.interval'))
}

RoundSchema.query.current = function () {
  return this.where({ }).sort({ startingAt: -1 })
}

const Round = mongoose.model('Round', RoundSchema)

module.exports = Round
