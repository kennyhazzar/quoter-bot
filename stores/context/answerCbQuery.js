const Datastore = require('nedb')
const nedbPromise = require('nedb-promise')

const db = new Datastore({ autoload: true, filename: 'data/context/AnswerCbQuery.db' })
const AnswerCbQuery = nedbPromise.fromInstance(db)

const compactDb = () => db.persistence.compactDatafile()

const isAnswerCbQueryValid = answerCbQuery => answerCbQuery.length === 4 ? true : false

const getOneAnswerCbQuery = (query = {}) => AnswerCbQuery.findOne(query)

const getAnswerCbQuery = (query = {}) => AnswerCbQuery.find(query)

const getCurrentAnswerCbQuery = () => AnswerCbQuery.findOne({ isSelect: true })

const addAnswerCbQuery = (answerCbQuery, isSelect = false) =>
    isAnswerCbQueryValid(answerCbQuery)
        ? AnswerCbQuery.insert({ query: answerCbQuery, isSelect }) : false

const updateCurrentAnswerCbQuery = answerCbQuery => {
    isAnswerCbQueryValid(answerCbQuery)
        ? AnswerCbQuery.update({ isSelect: true }, { $set: { query: answerCbQuery } }) : false
    compactDb()
}

const changeCurrentCbQuery = idNewCurrent => {
    AnswerCbQuery.update(
        { isSelect: true },
        { $set: { isSelect: false } }
    )
    AnswerCbQuery.update({ _id: idNewCurrent }, { $set: { isSelect: true } })
    compactDb()
}

const removeAnswerCbQuery = _id => {
    AnswerCbQuery.remove({ _id })
    compactDb()
}

module.exports = {
    getOneAnswerCbQuery,
    getAnswerCbQuery,
    getCurrentAnswerCbQuery,
    addAnswerCbQuery,
    updateCurrentAnswerCbQuery,
    changeCurrentCbQuery,
    removeAnswerCbQuery
}