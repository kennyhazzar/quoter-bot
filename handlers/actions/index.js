const { Composer } = require('telegraf')

const help = require('./help')
const { intervalTemplates } = require('../../constants/interval/intervalTemplates')
const { intervalMainMenu } = require('../../constants/interval/intervalMainMenu')
const action = new Composer()

function choiceKeyboard(callback_data) {
    return {
        reply_markup: {
            inline_keyboard: [
                [{ "text": "Добавить", "callback_data": callback_data[0] }],
                [{ "text": "Удалить", "callback_data": callback_data[1] }],
                [{ "text": "Посмотреть", "callback_data": callback_data[2] }],
            ],
            force_reply: true
        }
    }
}

// action.use(require('./addQuotes'))

action.action("IntervalTemplates", ctx => {
    ctx.editMessageText(`${intervalTemplates.helpMessage}${intervalTemplates.templateKey.map((item, index) => {
        return "\n" + `${index + 1}\. \t<strong>${item.title}</strong> \t-\t ${item.description}`
    }).join('')}`, {
        reply_markup: {
            inline_keyboard: [[{ "text": "Назад", "callback_data": "ReturnInterval" }]],
            force_reply: true
        },
        parse_mode: "HTML"
    })
})

action.action("Quotes", ctx => {
    console.log("Quotes")
    ctx.editMessageText(
        "Вы можете добавить, удалить или посмотреть сохраненные цитаты",
        choiceKeyboard(["AddQuotes", "DeleteQuotes", "ShowQuotes"]))
})

action.action("Help", help)

action.action("DeleteQuotes", ctx => {
    ctx.answerCbQuery("Воспользуйтесь командой /deleteQuote")
})

action.action("AddReminders", ctx => {
    ctx.answerCbQuery("Воспользуйтесь командой /remind")
})

action.action("ReturnInterval", ctx => {
    ctx.editMessageText(intervalMainMenu.messageText, intervalMainMenu.inline_keyboard)
})

module.exports = action