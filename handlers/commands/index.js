const { Composer } = require('telegraf')

const commands = new Composer()

commands.start(require('./start'))

commands.command('unsubscribe', require('./unsubscribe'))

commands.use(require('./context'))

commands.command('/remind', require('../actions/addReminder'))

module.exports = commands