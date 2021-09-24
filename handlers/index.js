const { Composer } = require('telegraf')

const handler = new Composer()

handler.use(
    require('./commands'),
    require('./middlewares'),
    require('./actions')
)

module.exports = handler