const commandString = [
    { title: "addStart", description: "Добавление нового шаблона" },
    { title: "deleteStart", description: "Удаление шаблона" },
    { title: "selectStart", description: "Выбор текущего шаблона" },
    { title: "showStarts", description: "Информация о всех шаблонах" },
    { title: "updateStart", description: "Обновление сообщения текущего шаблона" },
]

const startHelpHandler = ctx => {
    if (ctx.chat.type !== 'private') return null

    ctx.reply("Привет! Данной командой ты имеешь возможность изменить приветственное сообщение!\n" +
        "\nЧтобы узнать, как пользоваться командой, просто воспользуйся ей без параметров.\n" +
        "\n\nСписок команд:\n" + `${commandString.map((item, index) => {
            return `\n${index + 1}. /${item.title} - ${item.description}\n`
        }).join('')}`)
}

module.exports = startHelpHandler