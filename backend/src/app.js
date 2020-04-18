require('module-alias/register')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const paginate = require('express-paginate')
const process = require('process')
const util = require('util')
const config = require('config')
const path = require('path')

require('express-async-errors')
require('./services/mongoose')

async function init () {
  console.log(util.inspect(config, { depth: null }))

  var isProduction = process.env.NODE_ENV === 'production'

  var app = express()

  if (config.get('api.allowCors')) {
    const cors = require('cors')
    app.use(cors())
  }

  app.use(morgan('common'))

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use(paginate.middleware(10, 50))

  app.use(express.static(path.join(__dirname, '../public')))

  app.use(require('./routes'))

  const agenda = require('./services/agenda')
  agenda.start()

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    console.log(req.path)
    if (req.path.startsWith('/api')) {
      var err = new Error('Not Found')
      err.status = 404
      next(err)
    } else {
      return res.sendFile(path.join(__dirname, '../public/index.html'))
    }
  })

  /// error handlers
  if (!isProduction) {
    app.use(function (err, req, res, next) {
      console.log(err.stack)

      res.status(err.status || 500)

      res.json({ 'errors': {
        message: err.message,
        error: err
      } })
    })
  } else {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500)
      res.json({ 'errors': {
        message: err.message,
        error: {}
      } })
    })
  }

  // finally, let's start our server...
  var server = app.listen(config.get('api.port') || 8080, function () {
    console.log('Listening on port ' + server.address().port)
  })
}

init()
