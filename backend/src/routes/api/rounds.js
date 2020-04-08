const router = require('express').Router()
const mongoose = require('mongoose')
const lodash = require('lodash')
const Round = mongoose.model('Round')
const UserState = mongoose.model('UserState')

const auth = require('../auth')

router.post('/act', auth.required, async (req, res, next) => {
  const { guess } = req.body
  const { user } = req
  let currentRound = await Round.findOne().current()
  if (!currentRound) {
    currentRound = await Round.startRound()
  }

  const userState = await UserState.findOneAndUpdate({ round: currentRound._id, user: user.id }, { guess }, { upsert: true, new: true })
  res.send({ data: userState })
})

router.get('/current', async (req, res, next) => {
  const currentRound = await Round.findOne().current()
  res.send({ data: currentRound })
})

router.get('/current/state', auth.required, async (req, res) => {
  const { user } = req
  const currentRound = await Round.findOne().current()
  const userState = await UserState.findOne({ round: currentRound._id, user: user.id })
  res.send({ data: userState })
})

router.get('/', auth.required, async (req, res) => {
  const { user } = req
  const userStatesWithRounds = await UserState.find({ user: user.id })
    .populate('round')

  const userStatesWithWinningRounds = userStatesWithRounds.map(userState => userState.user.toString() === userState.round.winnerId ? { ...userState.toJSON(), isWinner: true } : lodash.omit(userState.toJSON(), 'round.winnerId'))
  res.send({ data: userStatesWithWinningRounds })
})

router.get('/wins', auth.required, async (req, res) => {
  const { user } = req
  const myWinRounds = await Round.find({ winnerId: user.id })
  res.send({ data: myWinRounds })
})

module.exports = router
