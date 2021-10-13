const ms = require("millisecond")
const { Telegraf, session } = require("telegraf")

const config = require("config");
const autoLoad = require("./autoLoadReminders");

const bot = new Telegraf(config.get("botToken"), {
    handlerTimeout: ms("5s"),
    telegram: { webhookReply: false }
});

bot.context.reminderLocal = [];

(async () => autoLoad(bot))();

bot.use(session())

module.exports = bot