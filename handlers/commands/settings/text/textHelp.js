const commandString = [
    { title: "addText", description: "Добавление нового шаблона" },
    { title: "deleteText", description: "Удаление шаблона" },
    { title: "selectText", description: "Выбор текущего шаблона" },
    { title: "showTexts", description: "Информация о всех шаблонах" },
    { title: "updateText", description: "Обновление сообщения текущего шаблона" },
]

const textHelpHandler = ctx => {
    if (ctx.chat.type !== 'private') return null

    ctx.reply("Привет! Данной командой ты имеешь возможность изменить сообщение ответа на остальные сообщения!\n" +
        "\nЧтобы узнать, как пользоваться командой, просто воспользуйся ей без параметров.\n" +
        "\n\nСписок команд:\n" + `${commandString.map((item, index) => {
            return `\n${index + 1}. /${item.title} - ${item.description}\n`
        }).join('')}`)
}

module.exports = textHelpHandler