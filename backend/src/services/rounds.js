const request = require('request-promise-native')
const config = require('config')
const mongoose = require('./mongoose')
const Round = mongoose.model('Round')
const UserState = mongoose.model('UserState')

const determineWinners = async () => {
  const rounds = await Round.find({ winnerId: { $exists: false } })
  for (let round of rounds) {
    await determineWinner(round)
  }
}

const determineWinner = async (round) => {
  const userStates = await UserState.find({ roundId: round.id })
  const winner = userStates[0]

  const { data } = await request.post('/prizes', {
    baseUrl: config.get('crypto.apiBase'),
    headers: {
      'Authorization': `Bearer ${config.get('crypto.jwt')}`
    },
    json: true,
    body: {
      winnerId: winner.user
    }
  })

  round.reward = data.amount
  round.winnerId = winner.user

  return round.save()
}

const claimRewards = async (user) => {
  return request.post(`${config.get('crypto.apiBase')}/prizes/claim`, {
    headers: {
      'Authorization': `Bearer ${config.get('crypto.jwt')}`
    },
    json: true,
    body: {
      winnerId: user._id,
      winnerAccountAddress: user.accountAddress
    }
  })

  // const rounds = await Round.find({ winnerId: user._id })
  // for (let round of rounds) {
  //   await request.post(`${config.get('crypto.apiBase')}/prizes/claim`, {
  //     headers: {
  //       'Authorization': `Bearer ${config.get('crypto.jwt')}`
  //     },
  //     json: true,
  //     body: {
  //       winnerId: user._id,
  //       winnerAccountAddress: user.accountAddress
  //     }
  //   })
  // }
}

module.exports = {
  determineWinners,
  determineWinner,
  claimRewards
}
