const menuHandler = async ctx => {
    ctx.reply(`Сохраненные цитаты`, {
        reply_markup: {
            inline_keyboard: [
                [{ "text": "Все мы гении. Но если вы будете судить рыбу по её способности взбираться на дерево, она проживёт всю жизнь, считая себя дурой.", "callback_data": "Position1" }],
                [{ "text": "Цитата2", "callback_data": "Position2" }],
                [{ "text": "Цитата3", "callback_data": "Position3" }],
                [{ "text": "Цитата4", "callback_data": "Position4" }],
                [{ "text": "Цитата5", "callback_data": "Position5" }],
                [{ "text": "<<<", "callback_data": "Return" },
                { "text": ">>>", "callback_data": "Enter" }]
            ],
            force_reply: true
        }
    })
}

module.exports = menuHandler