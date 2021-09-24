const { Composer } = require('telegraf')

const settings = new Composer()

settings.use(require('./start/'))

settings.use(require('./text/'))

module.exports = settings