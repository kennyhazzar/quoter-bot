const Start = require('../../../../stores/context/start.js')

const deleteStartHandler = async ctx => {
    if (ctx.chat.type !== 'private') return null

    var userMessage = ctx.message.text

    const start = await Start.getStart()

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()

    if (commandInstance === '/deleteStart') {

        ctx.replyWithHTML(`Список шаблонов приветственного сообщения:\n(Текст, айди)\n
        ${start.length == 0 ? "Пусто\n" : start.map((item, index) => {
            return "\n" + `${index + 1}. ${item.data}\n<strong>${item._id}</strong>\n`
        }).join('')}\n\nДля удаления шаблона, введи /deleteStart &lt;айди из списка&gt;`)
    } else {
        Start.removeStart(commandInstance)
        ctx.reply("Шаблон удален")
    }
}

module.exports = deleteStartHandler