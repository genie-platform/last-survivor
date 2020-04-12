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
  const userStates = await UserState.find({ round: round.id })
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
  round.isDone = true
  userStates[0].isWinner = true
  await userStates[0].save()
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
}

const startRound = async () => {
  await determineWinners()

  const startingAt = new Date()

  const intersectedRound = await Round.findOne({ endingAt: { $gte: startingAt } })
  if (intersectedRound) {
    throw new Error('New round already started')
  }

  const endingAt = new Date()
  endingAt.setHours(startingAt.getHours() + 24)
  const round = await new Round({
    startingAt,
    endingAt
  }).save()
  console.log(`new round starting at ${round.startingAt}, finishes at: ${round.endingAt}`)
  return round
}

module.exports = {
  determineWinners,
  determineWinner,
  startRound,
  claimRewards
}
