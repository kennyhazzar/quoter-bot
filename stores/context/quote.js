const Datastore = require('nedb')

const nedbPromise = require('nedb-promise')

const db = new Datastore({autoload: true, filename: 'data/context/Quote.db'})

const Quote = nedbPromise.fromInstance(db)

const compactDb = () => db.persistence.compactDatafile()

const isQuoteValid = (quoteText) => typeof quoteText == 'string' ? true : false

const getQuoteOne = (query = {}) => Quote.findOne(query)

const getQuote = (query = {}) => Quote.find(query)

const getCurrentQuote = () => Quote.findOne({ isSelect: true })

const addQuote = (quoteText, isSelect = false) =>
    isQuoteValid(quoteText) ?
        Quote.insert({ data: quoteText, isSelect }) : null


const updateCurrentquote = (newQuoteText) => {
    isQuoteValid(newQuoteText)
        ? Quote.update({ isSelect: true }, { $set: { data: newQuoteText } }) : null
    compactDb()
}

const changeCurrentQuote = idNewCurrent => {
    Quote.update(
        { isSelect: true },
        { $set: { isSelect: false } }
    )
    Quote.update({ _id: idNewCurrent }, { $set: { isSelect: true } })
    compactDb()
}

const removeQuote = (_id) => {
    Quote.remove({ _id })
    compactDb()
}

module.exports = {
    getCurrentQuote,
    getQuote,
    getQuoteOne,
    addQuote,
    updateCurrentquote,
    changeCurrentQuote,
    removeQuote
}