const router = require('express').Router()
const request = require('request-promise-native')
const config = require('config')
const auth = require('../auth')
const mongoose = require('mongoose')
const User = mongoose.model('User')

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

router.post('/toss', auth.required, async (req, res, next) => {
  const won = getRandomInt(4) === 0
  if (won) {
    const winnerId = req.user.id
    await request.post(`${config.get('crypto.apiBase')}/prizes`, {
      headers: {
        'Authorization': `Bearer ${config.get('crypto.jwt')}`
      },
      json: true,
      body: {
        won,
        winnerId
      }
    })
    return res.json({ data: {
      won,
      winnerId
    } })
  }
  return res.json({ data: {
    won
  } })
})

router.post('/claim', auth.required, async (req, res, next) => {
  // const winnerId = req.user.id
  const user = await User.findById(req.user.id)
  // const { winnerAccountAddress } = req.body
  if (!user.accountAddress) {
    return res.send({
      error: 'No account address for user'
    }).status(400)
  }
  await request.post(`${config.get('crypto.apiBase')}/prizes/claim`, {
    headers: {
      'Authorization': `Bearer ${config.get('crypto.jwt')}`
    },
    json: true,
    body: {
      winnerId: user._id,
      winnerAccountAddress: user.accountAddress
    }
  })
  return res.send({ success: true })
})

router.get('/prize', async (req, res, next) => {
  const response = await request.get(`${config.get('crypto.apiBase')}/prizes/nextPrize/`, {
    headers: {
      'Authorization': `Bearer ${config.get('crypto.jwt')}`
    }
  })
  return res.send(response)
})

module.exports = router
