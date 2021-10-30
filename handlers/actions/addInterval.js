const Reminder = require('../../stores/context/reminder')

// const TIME_OFFSET_UTC3 = 10800000
// const TIME_OFFSET_UTC4 = 14400000
// const TIME_OFFSET_UTC7 = 25200000

const { intervalTemplates } = require('../../constants/interval/intervalTemplates')

const addIntervalHandler = async ctx => {
    if (ctx.chat.type !== 'private') return null

    const userMessage = ctx.message.text

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()

    if (commandInstance === '/interval') {
        ctx.reply("Для добавления нового интервала, введи /interval <Шаблон интервала> <Категория>\nЕсли категория не выбрана, то цитаты будут браться все подряд",
            {
                reply_markup: {
                    inline_keyboard: [[{ "text": "Шаблоны", "callback_data": "IntervalTemplates" }]],
                    force_reply: true
                }
            })
    } else {
        const requestCommand = commandInstance.split(' ')

        const category = requestCommand[1]

        console.log(requestCommand)

        const isReqInterval = getIntervalByTag(requestCommand[0])

        if (!isReqInterval) {
            return ctx.reply("Использован несуществующий шаблон!")
        }

        if (!category) {
            await Reminder.addReminder({ time: isReqInterval.timeInterval, desc: isReqInterval.description }, ctx.chat.id, false, undefined)
            return ctx.reply(`Добавлен новый интервал, который будет работать по следующим правилам:\n${isReqInterval.description}\n
            Выбраны все категории.`)
        }

        await Reminder.addReminder({ time: isReqInterval.timeInterval, desc: isReqInterval.description }, ctx.chat.id, false, undefined, category)
        return ctx.reply(`Добавлен новый интервал, который будет работать по следующим правилам:\n${isReqInterval.description}\n
            Выбрана категория ${category}.`)

        // if (!category) {
        //     await Reminder.addReminder(remindTime, ctx.chat.id, true, new Date(remindTime).toUTCString())
        //     return ctx.reply(`Одноразовое уведомление в ${requestCommand[0]} было добавлено! Выбраны все категории для пользователя @${ctx.chat.username}`)
        // }

        // await Reminder.addReminder(remindTime, ctx.chat.id, true, new Date(remindTime).toUTCString(), category)
        // return ctx.reply(`Одноразовое уведомление в ${requestCommand[0]} было добавлено! Категория: ${requestCommand[1]} \nДля пользователя @${ctx.chat.username}`)

    }
}

function getIntervalByTag(tagTime) {
    if (tagTime === '*') {
        return intervalTemplates.templateKey[0]
    }
    else if (tagTime === '**') {
        return intervalTemplates.templateKey[1]
    }
    else if (tagTime === '***') {
        return intervalTemplates.templateKey[2]
    }
    else if (tagTime === '*1') {
        return intervalTemplates.templateKey[3]
    }
    else if (tagTime === '*2') {
        return intervalTemplates.templateKey[4]
    }
    else if (tagTime === '*3') {
        return intervalTemplates.templateKey[5]
    }
    else if (tagTime === '30m') {
        return intervalTemplates.templateKey[6]
    }
    else if (tagTime === '15m') {
        return intervalTemplates.templateKey[7]
    }
    else if (tagTime === '5m') {
        return intervalTemplates.templateKey[8]
    }
    return false
}

module.exports = addIntervalHandler