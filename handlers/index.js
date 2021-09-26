const { Composer } = require('telegraf')
const handler = new Composer()

handler.use((require('./actions/addQuotes.js')).middleware())

handler.action("AddQuotes", ctx => {
    console.log('AddQuotes')
    ctx.scene.enter("settingAddQuotesScene")
})

handler.use(
    require('./commands'),
    require('./middlewares'),
    require('./actions')
)

module.exports = handler