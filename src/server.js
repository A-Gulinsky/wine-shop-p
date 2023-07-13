import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

import hbs from './hbs/hbs.js'

import middlewareRouter from './routes/middleware-route.js'
import routerController from './controller/routers-controller.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import paypal from 'paypal-rest-sdk'


const app = express()

const PORT = process.env.PORT || 3000


app.use(session({
  secret: "mysecretkey",
  resave: true,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000,
    sameSite: false,
    secure: false,
  },
  store: new MongoStore({ mongoUrl: process.env.MONGO_URI }),
}));

// Handlebars settings
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs');
app.set('views', 'src/hbs')


paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AZVMP-q3DEZW2ouMoKIRjmNrAG_10kGqGzeLlkuXBBm5w4ty_YQEdVsswkKLj1OBuSFk9zK7Zy0ZMtk4',
  'client_secret': 'EP0klpo7VftVp_RcRSMAXcpIqBUjdOkidT0D79ZeMEpsCDv-7jWT4h5YQcIeyfTzlbb1nB75SjXzKp_O'
});



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

