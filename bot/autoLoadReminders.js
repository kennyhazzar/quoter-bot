const { getReminder, changeReminderToUsed } = require('../stores/context/reminder')
const isObjectEqual = require('./objectEquals')
const { getQuote } = require('../stores/context/quote')

const TIME_OFFSET_UTC3 = 10800000
const TIME_OFFSET_UTC4 = 14400000
const TIME_OFFSET_UTC7 = 25200000

const autoLoad = async (bot) => {
    console.log(bot.context)
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
                remind(newReminders[index], bot)
            }

        } catch (error) {
            console.log(error)
        }
    }, 2000);
}

async function remind(data, bot) {

    const time = new Date(data.time).getTime() - new Date().getTime()

    console.log(`date on remind: ${time / 1000}s`)
    console.log(new Date(data.time))

    if (data.oneTime) {
        console.log("oneTime")
        if (data.hasUsed || (time < 0)) {
            return
        }
        setTimeout(async () => {
            if (!data.category) {
                let quote = await getQuote({ userId: data.userId })

                randomQuote = quote[getRandomInt(0, quote.length)].quote
                bot.telegram.sendMessage(data.userId, randomQuote)
                try {
                    await changeReminderToUsed(data._id)
                } catch (error) {
                    console.log(error)
                }
            } else {
                let quote = await getQuote({ $and: [{ category: data.category }, { userId: data.userId }] })

                randomQuote = quote[getRandomInt(0, quote.length)].quote
                bot.telegram.sendMessage(data.userId, randomQuote)
                console.log(data._id)
                try {
                    await changeReminderToUsed(data._id)
                } catch (error) {
                    console.log(error)
                }
            }
        }, time)
    } else {
        //setInterval
    }


}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

module.exports = autoLoad