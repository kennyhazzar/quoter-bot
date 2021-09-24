const Datastore = require('nedb')
const nedbPromise = require('nedb-promise')

const db = new Datastore({ autoload: true, filename: 'data/context/Start.db' })
const Start = nedbPromise.fromInstance(db)

const compactDb = () => db.persistence.compactDatafile()

const isStartValid = (startMessage) => typeof startMessage == 'string' ? true : false

const getStartOne = (query = {}) => Start.findOne(query)

const getStart = (query = {}) => Start.find(query)

const getCurrentStart = () => Start.findOne({ isSelect: true })

const addStart = (startMessage, isSelect = false) =>
    isStartValid(startMessage) ?
        Start.insert({ data: startMessage, isSelect }) : null


const updateCurrentStart = (newStart) => {
    isStartValid(newStart)
        ? Start.update({ isSelect: true }, { $set: { data: newStart } }) : null
    compactDb()
}

const changeCurrentStart = idNewCurrent => {
    Start.update(
        { isSelect: true },
        { $set: { isSelect: false } }
    )
    Start.update({ _id: idNewCurrent }, { $set: { isSelect: true } })
    compactDb()
}

const removeStart = (_id) => {
    Start.remove({ _id })
    compactDb()
}

module.exports = {
    getCurrentStart,
    getStart,
    getStartOne,
    addStart,
    updateCurrentStart,
    changeCurrentStart,
    removeStart
}