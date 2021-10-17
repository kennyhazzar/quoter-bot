const intervalMainMenu = {
    messageText: "Для добавления нового интервала, введи /interval <Шаблон интервала> <Категория>\nЕсли категория не выбрана, то цитаты будут браться все подряд",
    inline_keyboard: {
        reply_markup: {
            inline_keyboard: [[{ "text": "Шаблоны", "callback_data": "IntervalTemplates" }]],
            force_reply: true
        }
    }
}

module.exports = {intervalMainMenu}