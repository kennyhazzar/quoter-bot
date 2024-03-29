﻿const { getReminder, changeReminderToUsed, addIntervalId } = require('../stores/context/reminder')
const isObjectEqual = require('./objectEquals')
const { getQuote, getQuoteFromAirtable } = require('../stores/context/quote')

const TIME_OFFSET_UTC3 = 10800000
const TIME_OFFSET_UTC4 = 14400000
const TIME_OFFSET_UTC7 = 25200000

var autoLoadIteration = 1

const autoLoad = async (bot) => {
    console.log(bot.context)
    var autoLoadTimer = 30000
    if (autoLoadIteration === 1) {
        autoLoadTimer = 3000
    } else autoLoadTimer = 30000
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
    }, autoLoadTimer);
}

async function remind(data, bot) {

    if (data.oneTime) {
        console.log("oneTime")

        const time = new Date(data.time.time).getTime() - new Date().getTime()

        console.log(`date on remind: ${time / 1000}s`)
        console.log(new Date(data.time.time))

        if (time < 0) {
            try {
                await changeReminderToUsed(data._id)
            } catch (error) {
                console.log(error)
            }
            return
        }
            
        if (data.hasUsed || (time < 0)) {
            console.log("setTimeout hasUsed")
            return
        }
        setTimeout(async () => {
            if (!data.category) {
                // let quote = await getQuote({ userId: data.userId })
                let quote = await getQuoteFromAirtable(`{userId} = '${data.userId}'`)

                randomQuote = quote[getRandomInt(0, quote.length)].quote
                bot.telegram.sendMessage(data.userId, randomQuote)
                try {
                    await changeReminderToUsed(data._id)
                } catch (error) {
                    console.log(error)
                }
            } else {
                // let quote = await getQuote({ $and: [{ category: data.category }, { userId: data.userId }] })
                let quote = await getQuoteFromAirtable(`AND({category} = '${data.category}', {userId} = '${data.userId}')`)

                randomQuote = quote[getRandomInt(0, quote.length)].quote
                bot.telegram.sendMessage(data.userId, randomQuote)
                try {
                    await changeReminderToUsed(data._id)
                } catch (error) {
                    console.log(error)
                }
            }
        }, time)
    } else {
        const timeInterval = data.time.time

        if (data.hasUsed || (data.time.time < 0)) {
            return
        }

        const idInterval = setInterval(async () => {
            // console.log(idInterval)
            // foo(idInterval)

            if (!data.category) {
                // let quote = await getQuote({ userId: data.userId })
                let quote = await getQuoteFromAirtable(`{userId} = '${data.userId}'`)
                if (quote.length === 0) return

                randomQuote = quote[getRandomInt(0, quote.length)].quote
                await bot.telegram.sendMessage(data.userId, randomQuote)

            } else {
                // let quote = await getQuote({ $and: [{ category: data.category }, { userId: data.userId }] })
                let quote = await getQuoteFromAirtable(`AND({category} = '${data.category}', {userId} = '${data.userId}')`)
                if (quote.length === 0) return


                randomQuote = quote[getRandomInt(0, quote.length)].quote
                await bot.telegram.sendMessage(data.userId, randomQuote)
            }
        }, timeInterval)
        
    }


}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function foo(idInt) {
    return console.log(idInt)
}

module.exports = autoLoad