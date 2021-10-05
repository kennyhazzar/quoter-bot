const ms = require("millisecond")
const { Telegraf, session } = require("telegraf")

const config = require("config")

const bot = new Telegraf(config.get("botToken"), {
    handlerTimeout: ms("5s"),
    telegram: { webhookReply: false }
})

bot.context.quoteMenuNumber = 0

bot.use(session())

module.exports = bot