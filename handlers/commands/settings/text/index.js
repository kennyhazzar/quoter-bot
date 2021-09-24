const { Composer } = require('telegraf')

const text = new Composer()

// text.command('updateText', require('./updateText'))
// text.command('addText', require('./addText'))
// text.command('showTexts', require('./showTexts'))
// text.command('deleteText', require('./deleteText'))
// text.command('selectText', require('./selectText'))
// text.command('textHelp', require('./textHelp'))

text.command('addText', require('./addText'))
text.command('selectText', require('./selectText'))
text.command('deleteText', require('./deleteText'))
text.command('updateText', require('./updateText'))
text.command('showTexts', require('./showTexts'))
text.command('textHelp', require('./textHelp'))

module.exports = text