const Reminder = require('../../stores/context/reminder')

// const TIME_OFFSET_UTC3 = 10800000
// const TIME_OFFSET_UTC4 = 14400000
// const TIME_OFFSET_UTC7 = 25200000

const addReminderHandler = async ctx => {
    if (ctx.chat.type !== 'private') return null

    const userMessage = ctx.message.text

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()

    if (commandInstance === '/remind') {
        ctx.reply("Для добавления нового одноразового напоминания, введи /remind <Время, либо шаблон> <Категория>\nЕсли категория не выбрана, то цитаты будут браться все подряд\nПример - /remind 14:00 Письмена")
    } else {
        const requestCommand = commandInstance.split(' ')

        const remindTime = getNumberOfTime(requestCommand[0])

        const category = requestCommand[1]

        const at = requestCommand[2]

        console.log(requestCommand)

        if (!category) {
            await Reminder.addReminder(remindTime, ctx.chat.id, true, new Date(remindTime).toUTCString())
            return ctx.reply(`Одноразовое уведомление в ${requestCommand[0]} было добавлено! Выбраны все категории для пользователя @${ctx.chat.username}`)
        }

        await Reminder.addReminder(remindTime, ctx.chat.id, true, new Date(remindTime).toUTCString(), category)
        return ctx.reply(`Одноразовое уведомление в ${requestCommand[0]} было добавлено! Категория: ${requestCommand[1]} \nДля пользователя @${ctx.chat.username}`)

    }
}

function getNumberOfTime(timeString) {
    const currentTime = new Date()
    const reminderTimeString = timeString.split(':')
    const reminderTime = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        reminderTimeString[0],
        reminderTimeString[1]
    )
    console.log(new Date(reminderTime.getTime()))
    // currentTime.setHours(reminderTimeString[0])
    // currentTime.setMinutes(reminderTimeString[1])
    // console.log(`currentTime after: - ${currentTime}`)
    return reminderTime.getTime()
}

module.exports = addReminderHandler