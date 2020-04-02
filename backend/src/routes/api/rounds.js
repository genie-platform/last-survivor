const router = require('express').Router()
const mongoose = require('mongoose')
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

  const userState = await UserState.findOneAndUpdate({ roundId: currentRound._id, user: user.id }, { guess }, { upsert: true, new: true })
  res.send({ data: userState })
})

router.get('/current', async (req, res, next) => {
  const currentRound = await Round.findOne().current()
  res.send({ data: currentRound })
})

router.get('/current/state', auth.required, async (req, res) => {
  const { user } = req
  const currentRound = await Round.findOne().current()
  const userState = await UserState.findOne({ roundId: currentRound._id, user: user.id })
  res.send({ data: userState })
})

router.get('/', auth.required, async (req, res) => {
  const { user } = req
  const myRounds = await UserState.find({ user: user.id })
  res.send({ data: myRounds })
})

router.get('/wins', auth.required, async (req, res) => {
  const { user } = req
  const myWinRounds = await Round.find({ winnerId: user.id })
  res.send({ data: myWinRounds })
})

module.exports = router
