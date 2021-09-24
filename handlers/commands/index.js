const { Composer } = require('telegraf')

const commands = new Composer()

commands.start(require('./start'))

commands.command('unsubscribe', require('./unsubscribe'))

module.exports = commands