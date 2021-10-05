const Datastore = require('nedb')

const nedbPromise = require('nedb-promise')

const db = new Datastore({autoload: true, filename: 'data/context/Category.db'})

const Category = nedbPromise.fromInstance(db)

const compactDb = () => db.persistence.compactDatafile()

const isCategoryValid = (quoteText) => typeof quoteText == 'string' ? true : false

const getCategoryOne = (query = {}) => Category.findOne(query)

const getCategory = (query = {}) => Category.find(query)

const getCurrentCategory = () => Category.findOne({ isSelect: true })

const addCategory = (quoteText, isSelect = false) =>
    isCategoryValid(quoteText) ?
        Category.insert({ data: quoteText, isSelect }) : null


const updateCurrentquote = (newCategoryText) => {
    isCategoryValid(newCategoryText)
        ? Category.update({ isSelect: true }, { $set: { data: newCategoryText } }) : null
    compactDb()
}

const changeCurrentCategory = idNewCurrent => {
    Category.update(
        { isSelect: true },
        { $set: { isSelect: false } }
    )
    Category.update({ _id: idNewCurrent }, { $set: { isSelect: true } })
    compactDb()
}

const removeCategory = (_id) => {
    Category.remove({ _id })
    compactDb()
}

module.exports = {
    getCurrentCategory,
    getCategory,
    getCategoryOne,
    addCategory,
    updateCurrentquote,
    changeCurrentCategory,
    removeCategory
}