const Datastore = require('nedb')
const nedbPromise = require('nedb-promise')

const db = new Datastore({ autoload: true, filename: 'data/context/Reminder.db' })
const Reminder = nedbPromise.fromInstance(db)

const compactDb = () => db.persistence.compactDatafile()

const isReminderValid = (reminderNumber) => typeof reminderNumber == 'number' ? true : false

const getReminderOne = (query = {}) => Reminder.findOne(query)

const getReminder = (query = {}) => Reminder.find(query)

const getCurrentReminder = () => Reminder.findOne({ isSelect: true })

const addReminder = (reminderNumber) =>
    isReminderValid(reminderNumber) ?
        Reminder.insert({ data: reminderNumber }) : null


const updateCurrentReminder = (newReminder) => {
    isReminderValid(newReminder)
        ? Reminder.update({ isSelect: true }, { $set: { data: newReminder } }) : null
    compactDb()
}

const changeCurrentReminder = idNewCurrent => {
    Reminder.update(
        { isSelect: true },
        { $set: { isSelect: false } }
    )
    Reminder.update({ _id: idNewCurrent }, { $set: { isSelect: true } })
    compactDb()
}

const removeReminder = (_id) => {
    Reminder.remove({ _id })
    compactDb()
}

module.exports = {
    getCurrentReminder,
    getReminder,
    getReminderOne,
    addReminder,
    updateCurrentReminder,
    changeCurrentReminder,
    removeReminder
}