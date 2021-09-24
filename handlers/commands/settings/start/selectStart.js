const Start = require('../../../../stores/context/start.js')

const selectStartHandler = async ctx => {
    if (ctx.chat.type !== 'private') return null

    var userMessage = ctx.message.text

    const start = await Start.getStart()

    const currentStart = await Start.getCurrentStart()

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()

    if (commandInstance === '/selectStart') {

        ctx.replyWithHTML(`Список шаблонов приветственного сообщения:\n(Текст, айди)\n
        ${start.length == 0 ? "Пусто\n" : start.map((item, index) => {
            return "\n" + `${index + 1}. ${item.data}\n<strong>${item._id}</strong>\n`
        }).join('')}` + `${currentStart ? "\n\nВ данный момент выбран:\n\n" + currentStart.data + 
        "\n" + currentStart._id : "\n\nВ данный момент ничего не выбрано\n\n"}` +
        "\n\nДля выбора шаблона, введи /selectStart &lt;айди из списка&gt;")
    } else {
        Start.changeCurrentStart(commandInstance)
        ctx.reply("Шаблон выбран")
    }
}

module.exports = selectStartHandler