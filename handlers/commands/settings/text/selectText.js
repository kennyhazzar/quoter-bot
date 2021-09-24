const Text = require('../../../../stores/context/voidMessage')

const selectTextHandler = async ctx => {
    if (ctx.chat.type !== 'private') return null

    var userMessage = ctx.message.text

    const start = await Text.getMessage()

    const currentText = await Text.getCurrentMessage()

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()

    if (commandInstance === '/selectText') {

        ctx.replyWithHTML(`Список шаблонов пустого сообщения:\n(Текст, айди)\n
        ${start.length == 0 ? "Пусто\n" : start.map((item, index) => {
            return "\n" + `${index + 1}. ${item.data}\n<strong>${item._id}</strong>\n`
        }).join('')}` + `${currentText ? "\n\nВ данный момент выбран:\n\n" + currentText.data + 
        "\n" + currentText._id : "\n\nВ данный момент ничего не выбрано\n\n"}` +
        "\n\nДля выбора шаблона, введи /selectText &lt;айди из списка&gt;")
    } else {
        Text.changeCurrentMessage(commandInstance)
        ctx.reply("Шаблон выбран")
    }
}

module.exports = selectTextHandler