const Datastore = require('nedb')
const nedbPromise = require('nedb-promise')

const db = new Datastore({ autoload: true, filename: 'data/logs/Message.db' })
const Message = nedbPromise.fromInstance(db)

const compactDb = () => db.persistence.compactDatafile()

const getMessageById = messageId => Message.findOne({ messageId })

const getMessageOne = (query = {}) => Message.findOne(query)

const getMessage = (query = {}) => Message.find(query)

const pushMessage = message => Message.insert(message)

const removeMessageDataById = messageId => {
    Message.remove({ messageId })
    compactDb()
}

module.exports = {
    getMessage,
    getMessageById,
    getMessageOne,
    pushMessage,
    removeMessageDataById
}

