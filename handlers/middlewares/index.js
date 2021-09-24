const { Composer } = require('telegraf')

const middleware = new Composer()

// middleware.use(require('./addUpdate'))

middleware.on('message', require('./message'))

module.exports = middleware