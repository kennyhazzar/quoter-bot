const { getCurrentStart } = require('../../stores/context/start')
const { getUserOne, addUser, returnToSub } = require('../../stores/context/user')
const { getReminder } = require('../../stores/context/reminder')
const {} = require('../../stores/context')
const startHandler = async ctx => {
    if (ctx.chat.type !== "private") return

    var user = await getUserOne({ username: ctx.chat.username })

    const message = await getCurrentStart()

    if (user?.isSub) {
        // const currentTime = Date.now()
        // ctx.mainState.menuMessageId = ctx.message.message_id
        // { $and: [{ category: data.category }, { userId: data.userId }] } 
        const reminder = await getReminder({ $and: [{ userId: ctx.chat.id }, { hasUsed: false }] })

        const currentTime = new Date()

        const notificationMessage = `\nСейчас включены следующие напоминания:\n${reminder.length !== 0 ? reminder.map((item, index) => {
            return `${index + 1}. ${!item.oneTime ? "Интервал" : "Одноразовое уведомление"} - <strong>${item.time.desc}</strong>\n`
        }).join("") : "<strong>Пусто</strong>"}`

        const startMessage = `Привет! Время на сервере: ${currentTime.getHours() < 10 ? "0" + currentTime.getHours() : currentTime.getHours()}:${currentTime.getMinutes() < 10 ? "0" + currentTime.getMinutes() : currentTime.getMinutes()}\n${notificationMessage}`

        return ctx.replyWithHTML(startMessage, {
            reply_markup: {
                inline_keyboard: [
                    [{ "text": "Цитаты", "callback_data": "Quotes" }],
                    [{ "text": "Помощь", "callback_data": "Help" }]
                    // [{ "text": "Категории", "callback_data": "Categories" }],
                    // [{"text": "Уведомления", "callback_data": "Reminders"}]
                ],
                force_reply: true
            }
        })
    }

    if (!user) {
        user = ctx.chat
        user.date = Date.now()
        user.isSub = true
        await addUser(user)
        if (!message) {
            return ctx.reply(`Привет, ${ctx.chat.username}! Ты подписался на ежедневную рассылку! Воспользуйся повторно командой /start`)
        }
        return ctx.replyWithHTML(message.data)
    }

    if (!user?.isSub) {
        returnToSub({ username: ctx.chat.username })
        return ctx.reply(`Привет, ${ctx.chat.username}! Мы рады снова тебя видеть:)`)
    }
}

module.exports = startHandler