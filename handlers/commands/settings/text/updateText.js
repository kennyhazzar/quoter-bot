const Text = require('../../../../stores/context/voidMessage')

const updateTextHandler = async ctx => {
    if (ctx.chat.type !== 'private') return null

    var userMessage = ctx.message.text

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()
    if (commandInstance === '/updateText') {
        const start = await Text.getCurrentMessage()
        ctx.reply("Для обновления текущего приветственного сообщения, введи\n\n/updateText <Текст сообщения>" +
            "\n\nТекущее сообщение:\n" + (start?.data ? start.data : "Не выбрано"))
    } else {
        const start = await Text.getCurrentMessage()
        if (!start?.data) return ctx.reply("Невозможно обновить текущее приветственное сообщение:\n" +
            "Текущее приветственное сообщение не выбрано")
        Text.updateCurrentmessage(commandInstance)
        ctx.reply("Изменения внесены.")
    }
}

module.exports = updateTextHandler