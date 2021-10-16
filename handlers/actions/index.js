const { Composer } = require('telegraf')
const help = require('./help')
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

action.action("Quotes", ctx => {
    console.log("Quotes")
    ctx.editMessageText(
        "Вы можете добавить, удалить или посмотреть сохраненные цитаты",
        choiceKeyboard(["AddQuotes", "DeleteQuotes", "ShowQuotes"]))
})

action.action("Help", help)

action.command("/help", help)

action.action("DeleteQuotes", ctx => {
    ctx.answerCbQuery("Воспользуйтесь командой /deleteQuote")
})

action.action("AddReminders", ctx => {
    ctx.answerCbQuery("Воспользуйтесь командой /remind")
})

module.exports = action