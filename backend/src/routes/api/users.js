const router = require('express').Router()
const auth = require('../auth')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const { claimRewards } = require('@services/rounds')

router.get('/', auth.required, async (req, res) => {
  const user = await User.findById(req.user.id)
  res.send({ data: user })
})

router.put('/', auth.required, async (req, res) => {
  const { accountAddress } = req.body
  const user = await User.findByIdAndUpdate(req.user.id, { accountAddress }, { new: true })
  await claimRewards(user)
  res.send({ data: user })
})

module.exports = router
