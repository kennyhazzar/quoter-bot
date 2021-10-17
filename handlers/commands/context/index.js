const { Composer } = require('telegraf')

const quoteComposer = new Composer()

quoteComposer.command("deleteQuote", require('./deleteQuote'))

quoteComposer.command("stopInterval", require('./stopInterval'))

module.exports = quoteComposer