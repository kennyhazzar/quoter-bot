const Text = require('../../../../stores/context/voidMessage.js')

const addTextHandler = async ctx => {
    if (ctx.chat.type !== 'private') return null

    var userMessage = ctx.message.text

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()
    if (commandInstance === '/addText') {
        ctx.reply("Для добавления сообщения, что будет реагировать на остальное, введи /addText <Текст сообщения>")
    } else {
        Text.addMessage(commandInstance)
        ctx.reply("Шаблон добавлен, для его выбора ознакомьтесь с командой /selectText")
    }
}

module.exports = addTextHandler