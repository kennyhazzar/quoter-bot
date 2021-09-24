const Datastore = require('nedb')
const nedbPromise = require('nedb-promise')

const db = new Datastore({ autoload: true, filename: 'data/logs/GetUpdatesLog.db' })
const Update = nedbPromise.fromInstance(db)

const compactDb = () => db.persistence.compactDatafile()

const addUpdates = update => Update.insert(update)

const getUpdates = (query = {}) => Update.find(query)

const getUpdatesOne = (query = {}) => Update.findOne(query)

module.exports = {
    addUpdates,
    getUpdates,
    getUpdatesOne
}