const Quote = require('../../stores/context/quote')

const { Composer, Scenes: { BaseScene, Stage }, Markup, Scenes } = require('telegraf')

const stageKeyboard = Markup.keyboard(['Прервать', 'Сохранить']).oneTime().resize(true)
const removeKeyboard = Markup.removeKeyboard()

const settingAddQuotesScene = new BaseScene('settingAddQuotesScene')

var quoteCount = 0

settingAddQuotesScene.enter(ctx => {
    ctx.session.quotes = []
    ctx.reply("Ты можешь сохранить максимум 10 цитат за один раз\nВписывай одну - нажимай Enter", stageKeyboard)
})

settingAddQuotesScene.on('text', ctx => {
    const text = ctx.update.message.text
    console.log(`${quoteCount}\n${ctx.session.quotes}`)
    quoteCount++
    if (text == "Сохранить") {
        return ctx.scene.leave()
    }
    if (text == "Прервать") {
        ctx.session.quotes = []
        return ctx.scene.leave()
    }
    if (quoteCount < 10) {
        ctx.reply(`Добавлено ${quoteCount} из 10`)
        return ctx.session.quotes.push(text)
    }
    ctx.session.quotes.push(text)
    ctx.reply(`Осталось ${quoteCount} из 4`)
    return ctx.scene.leave()

})

settingAddQuotesScene.leave(ctx => {
    console.log(`${quoteCount}\n${ctx.session.quotes}`)
    templateCount = 0
    if (ctx.session.quotes.length === 0) {
        return ctx.reply(`Сохранение прервано. Несохраненные цитаты удалены`)
    }
    // AnswerQuery.addAnswerCbQuery(ctx.session.quotes)
    return ctx.reply(`Сохранено ${ctx.session.quotes.length} цитат в категорию N`)
}, removeKeyboard)

const stage = new Stage([settingAddQuotesScene])

const addQuotesComposer = new Composer()

addQuotesComposer.use(stage.middleware())

addQuotesComposer.action("AddQuotes", ctx => {
    console.log('AddQuotes')
    ctx.scene.enter("settingAddQuotesScene")
})

addQuotesComposer.command('addQuery', ctx => console.log("addQuery"))

module.exports = addQuotesComposer