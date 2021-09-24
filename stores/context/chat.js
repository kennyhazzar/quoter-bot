const Datastore = require('nedb')
const nedbPromise = require('nedb-promise')

const db = new Datastore({ autoload: true, filename: 'data/context/Chat.db' })
const Chat = nedbPromise.fromInstance(db)

const compactDb = () => db.persistence.compactDatafile()

const getChatOne = (query = {}) => Chat.findOne(query)

const getChat = (query = {}) => Chat.find(query)

const addChat = (chat, chatId, isInclude = false) => Chat.insert({ chat: chat, isInclude, chatId })

const removeChatByChatId = (query = {}) => {
    Chat.remove(query)
    compactDb()
}

const removeChat = (_id) => {
    Chat.remove({ _id })
    compactDb()
}

module.exports = {
    getChat,
    getChatOne,
    addChat,
    removeChat,
    removeChatByChatId
}