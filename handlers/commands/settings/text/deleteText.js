const Text = require('../../../../stores/context/voidMessage')

const deleteTextHandler = async ctx => {
    if (ctx.chat.type !== 'private') return null

    var userMessage = ctx.message.text

    const start = await Text.getMessage()

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()

    if (commandInstance === '/deleteText') {

        ctx.replyWithHTML(`Список шаблонов приветственного сообщения:\n(Текст, айди)\n
        ${start.length == 0 ? "Пусто\n" : start.map((item, index) => {
            return "\n" + `${index + 1}. ${item.data}\n<strong>${item._id}</strong>\n`
        }).join('')}\n\nДля удаления шаблона, введи /deleteText &lt;айди из списка&gt;`)
    } else {
        Text.removeMessage(commandInstance)
        ctx.reply("Шаблон удален")
    }
}

module.exports = deleteTextHandler