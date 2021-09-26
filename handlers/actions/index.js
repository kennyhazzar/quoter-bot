const { Composer } = require('telegraf')

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

action.action("Categories", ctx => {
    ctx.editMessageText(
        "Вы можете добавить, удалить или посмотреть сохраненные категории",
        choiceKeyboard(["AddCategories", "DeleteCategories", "ShowCategories"])
    )
})

action.action("Reminders", ctx => {
    ctx.editMessageText(
        "Вы можете добавить, удалить или посмотреть сохраненные категории",
        choiceKeyboard(["AddReminders", "DeleteReminders", "ShowReminders"]))
})

action.action("DeleteQuotes", ctx => {
    ctx.answerCbQuery("Воспользуйтесь командой /deleteQuote")
})

action.action("AddReminders", ctx => {
    ctx.answerCbQuery("Воспользуйтесь командой /remind")
})

module.exports = action