const { Composer } = require('telegraf')

const commands = new Composer()

commands.start(require('./start'))

commands.command('unsubscribe', require('./unsubscribe'))

commands.use(require('./context'))

commands.command('/remind', require('../actions/addReminder'))

commands.command('/menu', require('./testMenu'))

module.exports = commands