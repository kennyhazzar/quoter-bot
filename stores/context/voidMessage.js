const Datastore = require('nedb')

const nedbPromise = require('nedb-promise')

const db = new Datastore({autoload: true, filename: 'data/context/EmptyMessage.db'})

const Message = nedbPromise.fromInstance(db)

const compactDb = () => db.persistence.compactDatafile()

const isMessageValid = (messageText) => typeof messageText == 'string' ? true : false

const getMessageOne = (query = {}) => Message.findOne(query)

const getMessage = (query = {}) => Message.find(query)

const getCurrentMessage = () => Message.findOne({ isSelect: true })

const addMessage = (messageText, isSelect = false) =>
    isMessageValid(messageText) ?
        Message.insert({ data: messageText, isSelect }) : null


const updateCurrentmessage = (newMessageText) => {
    isMessageValid(newMessageText)
        ? Message.update({ isSelect: true }, { $set: { data: newMessageText } }) : null
    compactDb()
}

const changeCurrentMessage = idNewCurrent => {
    Message.update(
        { isSelect: true },
        { $set: { isSelect: false } }
    )
    Message.update({ _id: idNewCurrent }, { $set: { isSelect: true } })
    compactDb()
}

const removeMessage = (_id) => {
    Message.remove({ _id })
    compactDb()
}

module.exports = {
    getCurrentMessage,
    getMessage,
    getMessageOne,
    addMessage,
    updateCurrentmessage,
    changeCurrentMessage,
    removeMessage
}