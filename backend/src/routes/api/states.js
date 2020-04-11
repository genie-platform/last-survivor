const router = require('express').Router()
const auth = require('../auth')
const mongoose = require('mongoose')
const UserState = mongoose.model('UserState')

router.get('/last', auth.required, async (req, res) => {
  const { user } = req
  const lastState = await UserState.findOne({ user: user.id }).sort({ createdAt: -1 }).populate('round', { winnerId: 0 })
  res.send({ data: lastState })
})

module.exports = router
