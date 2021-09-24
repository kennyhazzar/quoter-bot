const Text = require('../../../../stores/context/voidMessage')

const showTextHandler = async ctx => {
    if (ctx.chat.type !== 'private') return null

    var userMessage = ctx.message.text

    const start = await Text.getMessage()
    const currentTextData = (await Text.getCurrentMessage())?.data


    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()
    if (commandInstance === '/showTexts') {
        ctx.replyWithHTML(`Список шаблонов приветственного сообщения:\n
        ${start.length == 0 ? "Пусто\n" : start.map((item, index) => {
            return "\n" + `${index + 1}. ${item.data}\n`
        }).join('')}\n${currentTextData ? "Текущий выбор:\n" + currentTextData : ""}`)
    }
}

module.exports = showTextHandler