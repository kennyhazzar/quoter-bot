const bot = require('./bot')

bot.use(require('./handlers'))

try {
    bot.launch()
    console.log("Started")
} catch (error) {
    console.log(error)
}