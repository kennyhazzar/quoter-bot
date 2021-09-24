const { getUpdates } = require('../../stores/logs/getUpdatesLog')

const addUpdateHandler = async (ctx, next) => {
    const update = (await ctx.telegram.getUpdates())[0]
    console.log(update)
}

module.exports = addUpdateHandler