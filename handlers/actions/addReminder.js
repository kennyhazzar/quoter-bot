const Reminder = require('../../stores/context/reminder')
const Quote = require('../../stores/context/quote.js')
const addReminderHandler = async ctx => {
    if (ctx.chat.type !== 'private') return null

    var userMessage = ctx.message.text

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()

    if (commandInstance === '/remind') {
        ctx.reply("Для добавления нового приветственного сообщения как шаблон, введи /remind <Текст сообщения>")
    } else {
        console.log(commandInstance)
        const reminder = getNumberOfTime(commandInstance)
        Reminder.addReminder(reminder)
        const quote = await Quote.getQuote()
        setTimeout(async () => {
            ctx.reply(quote[getRandomInt(0, quote.length)].data)
        }, reminder - (new Date()).getTime())
        ctx.reply("Уведомление добавлено!")
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