const request = require('request-promise-native')
const config = require('config')
const lodash = require('lodash')
const { getRandomInt } = require('../utils/math')
const mongoose = require('./mongoose')
const Round = mongoose.model('Round')
const UserState = mongoose.model('UserState')

const determineWinners = async () => {
  const rounds = await Round.find({ isDone: false })
  for (let round of rounds) {
    await determineWinner(round)
  }
}

const getMedianState = (sortedUserStates) => {
  if (sortedUserStates.length === 0) {
    return null
  }

  if (sortedUserStates.length === 1) {
    return sortedUserStates[0]
  }

  const half = Math.floor(sortedUserStates.length / 2)

  if (sortedUserStates.length % 2) {
    return sortedUserStates[half]
  }

  // in case there's even number of elements, choose one randomly
  if (getRandomInt(2) % 2) {
    return sortedUserStates[half]
  } else {
    return sortedUserStates[half - 1]
  }
}

const determineWinner = async (round) => {
  const userStates = await UserState.find({ round: round.id, guess: { $exists: true } }).sort({ guess: 1 })

  if (userStates.length === 0) {
    console.warn(`No user states with guessess in round ${round.id}`)
    round.isDone = true
    return round.save()
  }

  const medianState = getMedianState(userStates)

  console.log({ medianState })

  const winner = lodash.maxBy(userStates, (state) => Math.abs(medianState.guess - state.guess))

  console.log({ winner })

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
  round.guess = winner.guess
  round.isDone = true
  winner.isWinner = true
  await winner.save()
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

const createNextRound = async () => {
  await determineWinners()

  const startingAt = new Date()

  const intersectedRound = await Round.findOne({ endingAt: { $gte: startingAt } })
  if (intersectedRound &&
    intersectedRound.startingAt.getTime() - startingAt.getTime() > Round.getRoundInterval()) {
    console.warn('Next round already created')
    return
  }

  const round = await Round.createRound(startingAt)
  console.log(`new round starting at ${round.startingAt}, finishes at: ${round.endingAt}`)
  return round
}

module.exports = {
  determineWinners,
  determineWinner,
  createNextRound,
  claimRewards
}
