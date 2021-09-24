const { unsubUserByQuery, getUserOne, removeUserByQuery } = require('../../stores/context/user')

const unsubscribeHandler = async ctx => {
    const user = await getUserOne({username: ctx.chat.username})
    if (!user || !user.isSub) {
        return ctx.reply("Вы уже отписаны, но с помощью /start можно вернуться обратно!")
    }
    unsubUserByQuery({username: user.username})
}

module.exports = unsubscribeHandler