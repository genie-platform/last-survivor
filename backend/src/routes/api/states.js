const router = require('express').Router()
const auth = require('../auth')
const mongoose = require('mongoose')
const UserState = mongoose.model('UserState')
const Round = mongoose.model('Round')

router.get('/last', auth.required, async (req, res) => {
  const { user } = req
  const lastState = await UserState.findOne({ user: user.id }).sort({ createdAt: -1 }).populate('round', { winnerId: 0 })
  res.send({ data: lastState })
})

router.post('/', auth.required, async (req, res) => {
  const { user } = req
  const round = await Round.findOne().current()
  const currentState = await UserState.findOne({ round, user: user.id })

  if (currentState) {
    console.error('User already has a state')
    res.send({ error: 'User already has a state', data: currentState })
    return
  }

  const userState = await new UserState({
    round: round._id,
    user: user.id
  }).save()

  res.send({ data: userState })
})

router.put('/', auth.required, async (req, res) => {
  const { guess, userStateId } = req.body
  const { user } = req

  const userState = await UserState.findOneAndUpdate({ _id: userStateId, user: user.id }, { guess }, { new: true })
  res.send({ data: userState })
})

module.exports = router
