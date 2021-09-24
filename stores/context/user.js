const Datastore = require('nedb')
const nedbPromise = require('nedb-promise')

const db = new Datastore({ autoload: true, filename: 'data/context/User.db' })
const User = nedbPromise.fromInstance(db)

const compactDb = () => db.persistence.compactDatafile()

const getUserOne = (query = {}) => User.findOne(query)

const getUser = (query = {}) => User.find(query)

const addUser = user => User.insert(user)

const removeUserByQuery = (query = {}) => {
    User.remove(query)
    compactDb()
}

const unsubUserByQuery = username => {
    User.update(username, { $set: { isSub: false } })
    compactDb()
}

const returnToSub = username => {
    User.update(username, { $set: { isSub: true } })
    compactDb()
}

const removeUser = (_id) => {
    User.remove({ _id })
    compactDb()
}

module.exports = {
    getUser,
    getUserOne,
    addUser,
    removeUser,
    removeUserByQuery,
    unsubUserByQuery,
    returnToSub
}