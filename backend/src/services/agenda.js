const config = require('config')
const Agenda = require('agenda')
const { createNextRound } = require('@services/rounds')

const agenda = new Agenda({ db: { address: config.get('mongo.uri'), options: config.get('mongo.options') } })

const tasks = {
  createNextRound
}

Object.entries(tasks).forEach(([taskName, task]) => {
  const runJob = async (job, done) => {
    try {
      console.log('Starting a job')
      job.attrs.data ? await task(job.attrs.data, job) : await task(job)
    } catch (err) {
      console.log({ err })
      return done(err)
    }
    done()
  }

  console.log(`adding definition of task ${taskName}`)
  agenda.define(taskName, runJob)
})

async function start () {
  console.log('Starting Agenda job scheduling')

  agenda.on('start', job => console.info(`Job ${job.attrs.name} starting. id: ${job.attrs._id}`))
  agenda.on('complete', job => console.info(`Job ${job.attrs.name} finished. id: ${job.attrs._id}`))
  agenda.on('success', job => console.info(`Job ${job.attrs.name} succeeded. id: ${job.attrs._id}`))
  agenda.on('fail', (error, job) => console.error(`Job ${job.attrs.name} failed. id: ${job.attrs._id}. ${error}`))

  await agenda.start()
  await agenda.every(config.get('rounds.interval'), 'createNextRound')
  // agenda.now('createNextRound')
  console.log('Agenda job scheduling is successfully defined')
}

module.exports = {
  start,
  agenda
}
