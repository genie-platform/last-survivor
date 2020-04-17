if (process.env.NODE_ENV === 'production') {
  require('./production.js')
} else {
  require('./dev.js')
}
