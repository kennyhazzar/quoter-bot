const { addQuote } = require('../../stores/context/quote')
const { Composer, Scenes: { BaseScene, Stage }, Markup, Scenes } = require('telegraf')

const stageKeyboard = Markup.keyboard(['Прервать', 'Сохранить']).oneTime().resize(true)
const removeKeyboard = Markup.removeKeyboard()

const settingAddQuotesScene = new BaseScene('settingAddQuotesScene')
// const settingAddReminderScene = new BaseScene('settingAddReminderSce')

settingAddQuotesScene.enter(ctx => {
    ctx.session.quoteCount = 0
    ctx.session.quotes = []
    ctx.session.category = ''
    ctx.reply("Введи название категории, в которую ты хочешь сохранить цитаты.\nЕсли введена несуществующая категория, то она будет создана автоматически", stageKeyboard)
    // ctx.reply("Ты можешь сохранить максимум 10 цитат за один раз\nВписывай одну - нажимай Enter", stageKeyboard)
})

settingAddQuotesScene.on('text', ctx => {
    const text = ctx.update.message.text

    if (text == "Прервать") {
        ctx.session.quotes = []
        return ctx.scene.leave()
    }

    if (ctx.session.quoteCount === 0) {
        ctx.session.category = text
        ctx.session.quoteCount++
        return ctx.reply("Категория сохранена!.\nТы можешь сохранить максимум 10 цитат за один раз\nВписывай одну - нажимай Enter", stageKeyboard)
    }
    ctx.session.quoteCount++
    if (text == "Сохранить") {
        return ctx.scene.leave()
    }
    
    if (ctx.session.quoteCount < 11) {
        console.log(ctx.session.quotes)
        ctx.reply(`Добавлено ${ctx.session.quoteCount - 1} из 10`)
        return ctx.session.quotes.push({ quote: text, category: ctx.session.category })
    }
    ctx.session.quotes.push({ quote: text, category: ctx.session.category })
    return ctx.scene.leave()

})

settingAddQuotesScene.leave(async ctx => {
    const userId = ctx.chat.id

    if (ctx.session.quotes.length === 0) {
        return ctx.reply(`Сохранение прервано. Несохраненные категории и цитаты удалены`)
    }

    for (let index = 0; index < ctx.session.quotes.length; index++) {
        const quote = ctx.session.quotes[index]
        await addQuote(quote.quote, quote.category, userId)
    }
    return ctx.reply(`Сохранено ${ctx.session.quotes.length} цитат в категорию ${ctx.session.category} для пользователя @${ctx.chat.username}`)
}, removeKeyboard)

const stage = new Stage([settingAddQuotesScene])

module.exports = stage