const Start = require('../../../../stores/context/start.js')

const updateStartHandler = async ctx => {
    if (ctx.chat.type !== 'private') return null

    var userMessage = ctx.message.text

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()
    
    if (commandInstance === '/updateStart') {
        const start = await Start.getCurrentStart()
        ctx.reply("Для обновления текущего приветственного сообщения, введи\n\n/updateStart <Текст сообщения>" +
            "\n\nТекущее сообщение:\n" + (start?.data ? start.data : "Не выбрано"))
    } else {
        const start = await Start.getCurrentStart()
        if (!start?.data) return ctx.reply("Невозможно обновить текущее приветственное сообщение:\n" +
            "Текущее приветственное сообщение не выбрано")
        Start.updateCurrentStart(commandInstance)
        ctx.reply("Изменения внесены.")
    }
}

module.exports = updateStartHandler