const { Composer } = require('telegraf')

const helpMessageWithMarkdown = {
    message: "",
    commands: [
        { title: "***/start***", description: "Запуск меню" },
        { title: "***/remind***", description: "Добавление новой одноразовой напоминалки." },
        { title: "***/interval***", description: "Задает интервал, в который будут отправляться уведомления" },
        { title: "***/deleteQuote***", description: "Удаление цитат" },
    ]
}

const helpHandler = async ctx => {
    console.log("from help.js")
    ctx.telegram.sendMessage(ctx.chat.id, `Команды, которые можно использовать в этом приложении.\n
    ${helpMessageWithMarkdown.commands.map((command, index) => {
        return "\n" + `${index + 1}. ${command.title} - ${command.description}`
    })}`, { parse_mode: "Markdown" })
}

module.exports = helpHandler