const { Composer } = require('telegraf')

const quoteComposer = new Composer()

quoteComposer.command("deleteQuote", require('./deleteQuote'))

module.exports = quoteComposer