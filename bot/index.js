const ms = require("millisecond")
const { Telegraf, session } = require("telegraf")
const { getReminder } = require('../stores/context/reminder')
const isObjectEqual = require('./objectEquals')
const config = require("config")
const { getQuote } = require('../stores/context/quote')

const bot = new Telegraf(config.get("botToken"), {
    handlerTimeout: ms("5s"),
    telegram: { webhookReply: false }
});

bot.context.reminderLocal = [];

(async () => {
    setInterval(async () => {
        try {
            var newReminders = []
            const reminder = await getReminder()

            if (!isObjectEqual(reminder, bot.context.reminderLocal)) {

                let localRemindLocal = bot.context.reminderLocal

                for (let index = 0; index < reminder.length; index++) {
                    if (reminder[index]._id !== localRemindLocal[index]?._id) {
                        if (!localRemindLocal[index]?._id) {
                            newReminders.push(reminder[index])
                        }
                    }
                }

                bot.context.reminderLocal = reminder
            }

            for (let index = 0; index < newReminders.length; index++) {
                remind(newReminders[index])
            }

        } catch (error) {
            console.log(error)
        }
    }, 2000);
})();


async function remind(data) {
    console.log(`date on remind: ${new Date(data.time).getTime() - new Date().getTime()}`)
    setTimeout(async () => {
        if (!data.category) {
            let quote = await getQuote({ userId: data.userId })

            randomQuote = quote[getRandomInt(0, quote.length)].quote
            bot.telegram.sendMessage(data.userId, randomQuote)
        } else {
            let quote = await getQuote({ $and: [{ category: data.category }, { userId: data.userId }] })

            randomQuote = quote[getRandomInt(0, quote.length)].quote
            bot.telegram.sendMessage(data.userId, randomQuote)
        }
    }, new Date(data.time).getTime() - new Date().getTime())
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

bot.use(session())

module.exports = bot