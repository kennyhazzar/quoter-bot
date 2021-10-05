const { getCurrentStart } = require('../../stores/context/start')
const { getUserOne, addUser, returnToSub } = require('../../stores/context/user')

const startHandler = async ctx => {
    if (ctx.chat.type !== "private") return

    const message = await getCurrentStart()
    var user = await getUserOne({ username: ctx.chat.username })

    if (user?.isSub) {
        // const currentTime = Date.now()
        // ctx.mainState.menuMessageId = ctx.message.message_id
        return ctx.reply(`Привет! Добавь новые цитаты:)\nДо следующей цитаты N часов N минут`, {
            reply_markup: {
                inline_keyboard: [
                    [{ "text": "Цитаты", "callback_data": "Quotes" }],
                    [{ "text": "Категории", "callback_data": "Categories" }],
                    [{"text": "Уведомления", "callback_data": "Reminders"}]
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
            return ctx.reply(`Привет, ${ctx.chat.username}! Ты подписался на ежедневную рассылку!`)
        }
        return ctx.replyWithHTML(message.data)
    }

    if (!user?.isSub) {
        returnToSub({username: ctx.chat.username})
        return ctx.reply(`Привет, ${ctx.chat.username}! Мы рады снова тебя видеть:)`)
    }
}

module.exports = startHandler