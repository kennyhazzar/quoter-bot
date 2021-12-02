const airtableKey = require('config').get('airtable.key')
const airtableBase = require('config').get('airtable.base')
const axios = require('axios')

const Datastore = require('nedb')
const nedbPromise = require('nedb-promise')
const db = new Datastore({ autoload: true, filename: 'data/context/Quote.db' })
const Quote = nedbPromise.fromInstance(db)

const compactDb = () => db.persistence.compactDatafile()

const isQuoteValid = (quoteText) => typeof quoteText == 'string' ? true : false

const getQuoteOne = (query = {}) => Quote.findOne(query)

const getQuote = (query = {}) => Quote.find(query)

const getCurrentQuote = () => Quote.findOne({ isSelect: true })

const getQuoteFromAirtable = async (filterByFormula = '') => {
    const tempData = []
    let url = `https://api.airtable.com/v0/${airtableBase}/%D0%A6%D0%B8%D1%82%D0%B0%D1%82%D1%8B?filterByFormula=${encodeURI(filterByFormula)}&view=Grid%20view`
    if (filterByFormula == '') {
        url = `https://api.airtable.com/v0/${airtableBase}/%D0%A6%D0%B8%D1%82%D0%B0%D1%82%D1%8B?view=Grid%20view`
    }

    const data = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${airtableKey}`
        }
    })

    data.data.records.map(item => tempData.push(item.fields))

    return tempData
}

const addQuote = (quoteText, categoryText, userId) => Quote.insert({ quote: quoteText, category: categoryText, userId })

const addQuoteToAirtable = async (quoteText, categoryText, userId) => {
    var data = JSON.stringify({
        "fields": {
          "quote": quoteText,
          "category": categoryText,
          "userId": userId
        }
      });
      
      var config = {
        method: 'post',
        url: `https://api.airtable.com/v0/${airtableBase}/%D0%A6%D0%B8%D1%82%D0%B0%D1%82%D1%8B`,
        headers: { 
          'Authorization': `Bearer ${airtableKey}`, 
          'Content-Type': 'application/json', 
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}

const updateCurrentQuote = (newQuoteText) => {
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
    updateCurrentQuote,
    changeCurrentQuote,
    removeQuote,
    getQuoteFromAirtable,
    addQuoteToAirtable
}