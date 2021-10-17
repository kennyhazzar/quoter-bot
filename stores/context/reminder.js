const Datastore = require('nedb')
const nedbPromise = require('nedb-promise')

const db = new Datastore({ autoload: true, filename: 'data/context/Reminder.db' })
const Reminder = nedbPromise.fromInstance(db)

const compactDb = () => db.persistence.compactDatafile()

const isReminderValid = (reminderNumber) => typeof reminderNumber == 'number' ? true : false

const getReminderOne = (query = {}) => Reminder.findOne(query)

const getReminder = (query = {}) => Reminder.find(query)

const getCurrentReminder = () => Reminder.findOne({ isSelect: true })

const addReminder = (time, userId, oneTime, stringTime, category = undefined) => Reminder.insert({ time, category, userId, oneTime, hasUsed: false, stringTime })

const changeCurrentReminder = idNewCurrent => {
    Reminder.update(
        { isSelect: true },
        { $set: { isSelect: false } }
    )
    Reminder.update({ _id: idNewCurrent }, { $set: { isSelect: true } })
    compactDb()
}

const changeReminderToUsed = _id => {
    Reminder.update(
        { _id },
        { $set: { hasUsed: true } }
    )
    compactDb()
}

const removeReminder = (_id) => {
    Reminder.remove({ _id })
    compactDb()
}

const addIntervalId = async (_id, idInterval) => {
    Reminder.update(
        { _id },
        { $set: { idInterval } }
    )
    compactDb()
}

const stopInterval = (_id) => {
    const temp = Reminder.update(
        { _id },
        { $set: { hasUsed: true } }
    )
    compactDb()
    return temp
}

module.exports = {
    getCurrentReminder,
    getReminder,
    getReminderOne,
    addReminder,
    changeCurrentReminder,
    removeReminder,
    changeReminderToUsed,
    addIntervalId,
    stopInterval
}