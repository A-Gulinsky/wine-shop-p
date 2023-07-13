import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

import Account from './db/models/account.js'

import hbs from './hbs/hbs.js'

const app = express()

const PORT = process.env.PORT || 3000

// Handlebars settings
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs');
app.set('views', 'src/hbs')

mongoose.set(`strictQuery`, false)
const connectDB = async () => {

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MONGO DB CONNECTED`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }


}

app.get('/', (req, res) => {
  res.render(`index`)
})

app.get(`/accounts`, async (req, res) => {
  const book = await Account.find();

  if (book) {
    res.json(book)
  } else {
    res.send(`Something went wrong`)
  }
})

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
})

