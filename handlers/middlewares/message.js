const { pushMessage } = require('../../stores/logs/messageUser')

const messageHandler = async ctx => {
    const message = ctx.message
    message.username = message.chat.username
    pushMessage(message)
}

module.exports = messageHandler