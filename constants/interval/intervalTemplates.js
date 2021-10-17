const intervalTemplates = {
    helpMessage: "Используй во втором аргументе команды /interval следующие шаблоны\n",
    templateKey: [
        { title: "*", description: "Один раз в сутки", timeInterval: 86400000 },
        { title: "**", description: "Два раза в сутки", timeInterval: 43200000 },
        { title: "***", description: "Три раза в сутки", timeInterval: 28800000 },
        { title: "*1", description: "Каждый час", timeInterval: 3600000 },
        { title: "*2", description: "Каждые два часа", timeInterval: 7200000 },
        { title: "*3", description: "Каждые три часа", timeInterval: 10800000 },
    ]
}

module.exports = { intervalTemplates }