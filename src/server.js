import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

import hbs from './hbs/hbs.js'

import middlewareRouter from './routes/middleware-route.js'
import routerController from './controller/routers-controller.js';


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

app.use(middlewareRouter)
app.use(routerController)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
})

