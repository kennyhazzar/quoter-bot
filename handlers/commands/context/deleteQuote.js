const Query = require('../../../stores/context/quote.js')

const deleteQueryHandler = async ctx => {
    if (ctx.chat.type !== 'private') return null

    var userMessage = ctx.message.text

    const query = await Query.getQuote()

    console.log(query)

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()

    if (commandInstance === '/deleteQuote') {
        ctx.replyWithHTML(`Список цитат:\n(Текст, айди)\n
        ${query.length == 0 ? "Пусто\n" : query.map((item, index) => {
            return "\n" + `${index + 1}. ${item.data.quote}\n<strong>${item._id}</strong>\n`
        }).join('')}\n\nДля удаления шаблона, введи /deleteQuote &lt;айди из списка&gt;`)
    } else {
        const quoteDelete = await Query.getQuoteOne({_id: commandInstance})
        await Query.removeQuote(commandInstance)
        ctx.replyWithHTML(`<strong>Цитата с содержанием</strong>:\n${quoteDelete.data}\n<strong>удалено</strong>`)
        
    }
}

module.exports = deleteQueryHandler