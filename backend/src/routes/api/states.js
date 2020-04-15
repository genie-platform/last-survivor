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
  console.log({ round })
  const currentState = await UserState.findOne({ round, user: user.id }).populate('round')

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

  if (!guess || !userStateId) {
    return res.status(400).send({ error: 'Body params are missing' })
  }

  const userState = await UserState.findOne({ _id: userStateId, user: user.id }).populate('round')
  if (!userState || !userState.round) {
    return res.status(400).send({ error: 'Related user state is not found' })
  }
  if (userState.round.isDone) {
    return res.status(400).send({ error: 'Cannot update finished round' })
  }
  userState.guess = guess
  await userState.save()
  // const userState = await UserState.findOneAndUpdate({ _id: userStateId, user: user.id }, { guess }, { new: true })
  res.send({ data: userState })
})

module.exports = router
