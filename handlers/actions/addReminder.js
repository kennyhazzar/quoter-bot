const Reminder = require('../../stores/context/reminder')
const Quote = require('../../stores/context/quote.js')
const addReminderHandler = async ctx => {
    if (ctx.chat.type !== 'private') return null

    var userMessage = ctx.message.text

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()

    ctx.reply("test done")
    if (commandInstance === '/remind') {
        ctx.reply("Для добавления нового приветственного сообщения как шаблон, введи /remind <Время, либо шаблон> <Категория>\nЕсли категория не выбрана, то цитаты будут браться все подряд")
    } else {
        const requestCommand = commandInstance.split(' ')
        console.log(requestCommand)
        const remindTime = getNumberOfTime(requestCommand[0])

        const category = requestCommand[1]

        if (!category) {
            await Reminder.addReminder(remindTime, ctx.chat.id)
            return ctx.reply(`Уведомление ${requestCommand[0]} было добавлено! Выбраны все категории для пользователя @${ctx.chat.username}`)
        }

        const quote = await Quote.getQuote({ category })
        if (quote.length === 0) {
            return ctx.reply(`Такой категории не существует`)
        }
        console.log(remindTime)
        await Reminder.addReminder(remindTime, ctx.chat.id, category)
        return ctx.reply(`Уведомление "${requestCommand[0]}" было добавлено! Категория: ${requestCommand[1]} для пользователя @${ctx.chat.username}`)

    }
}

function getNumberOfTime(timeString) {
    const currentTime = new Date()
    const reminderTime = timeString.split(':')
    currentTime.setHours(reminderTime[0] - 4)
    console.log(currentTime)
    // currentTime.setHours(currentTime.getHours() + 4)
    currentTime.setMinutes(reminderTime[1])
    return currentTime.getTime()
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

module.exports = addReminderHandler