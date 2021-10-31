const Query = require('../../../stores/context/quote.js')

const deleteQueryHandler = async ctx => {
    if (ctx.chat.type !== 'private') return null

    var userMessage = ctx.message.text

    const query = await Query.getQuote({userId: ctx.chat.id})

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()

    if (commandInstance === '/deleteQuote') {
        try {
            ctx.replyWithHTML(`Список цитат:\n(Текст, айди)\n
        ${query.length == 0 ? "Пусто\n" : query.map((item, index) => {
                return "\n" + `${index + 1}. ${item.quote}\n<strong>${item._id}</strong>\n`
            }).join('')}\n\nДля удаления шаблона, введи /deleteQuote &lt;айди из списка&gt;`)
        } catch (error) {
            ctx.reply(`Ошибка на стороне сервера, обратитесь к разработчику!Текст ошибки:\n${error.message}`)
            console.log(error)
        }
    } else {
        const quoteDelete = await Query.getQuoteOne({ _id: commandInstance })
        if (!quoteDelete) {
            return ctx.reply("Такого сообщения нету в базе данных")
        }
        await Query.removeQuote(commandInstance)
        return ctx.replyWithHTML(`<strong>Цитата с содержанием</strong>:\n${quoteDelete.quote}\n<strong>удалена</strong>`)
    }
}

module.exports = deleteQueryHandler