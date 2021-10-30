const intervalTemplates = {
    helpMessage: "Используй во втором аргументе команды /interval следующие шаблоны. Пример: /interval *1 Категория",
    templateKey: [
        { title: "*", description: "Один раз в сутки", timeInterval: 86400000 },
        { title: "**", description: "Два раза в сутки", timeInterval: 43200000 },
        { title: "***", description: "Три раза в сутки", timeInterval: 28800000 },
        { title: "*1", description: "Каждый час", timeInterval: 3600000 },
        { title: "*2", description: "Каждые два часа", timeInterval: 7200000 },
        { title: "*3", description: "Каждые три часа", timeInterval: 10800000 },
        { title: "30m", description: "Каждые 30 минут", timeInterval: 1800000 },
        { title: "15m", description: "Каждые 15 минут", timeInterval: 900000 },
        { title: "5m", description: "Каждые 5 минут", timeInterval: 300000 },
    ]
}

module.exports = { intervalTemplates }