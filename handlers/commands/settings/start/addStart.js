const Start = require('../../../../stores/context/start.js')

const addStartHandler = async ctx => {
    if (ctx.chat.type !== 'private') return null

    var userMessage = ctx.message.text

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()
    
    if (commandInstance === '/addStart') {
        ctx.reply("Для добавления нового приветственного сообщения как шаблон, введи /addStart <Текст сообщения>")
    } else {
        Start.addStart(commandInstance)
        ctx.reply("Шаблон добавлен, для его выбора ознакомьтесь с командой /selectStart")
    }
}

module.exports = addStartHandler