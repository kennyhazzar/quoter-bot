const Reminder = require('../../../stores/context/reminder')

const stopIntervalHandler = async ctx => {
    if (ctx.chat.type !== 'private') return null

    var userMessage = ctx.message.text

    const interval = await Reminder.getReminder({ $and: [{ oneTime: false }, { hasUsed: false }] })

    // console.log(interval)

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()

    if (commandInstance === '/stopInterval') {
        try {
            ctx.replyWithHTML(`Здесь вы можете остановить интервал, который сейчас выполняется:${interval.length == 0 ? "Нету активных интервалов\n" :
                interval.map((item, index) => {
                    return "\n" + `${index + 1}. ${item.time.desc} - <strong>${item._id}</strong>\n`
                }).join('')}\n\nДля удаления шаблона, введи /deleteQuote &lt;айди из списка&gt;`)
        } catch (error) {
            ctx.reply(`Ошибка на стороне сервера, обратитесь к разработчику!Текст ошибки:\n${error.message}`)
            console.log(error)
        }
    } else {
        const whoStop = await Reminder.getReminderOne({_id: commandInstance})
        console.log(whoStop)
        // clearInterval(whoStop.idInterval)
        await Reminder.stopInterval(commandInstance)
    }
}

module.exports = stopIntervalHandler