
// Express
import express from 'express'

// mongoose
import connectDB from './db/db.js'

// .env
import 'dotenv/config'

// Middleware/Routers
import middlewareRouter from './routes/middleware-route.js'
import routerController from './controller/routers-controller.js';

// hbs Engine (config)
import { hbsEngine } from './configs/hbs-engine-config.js'

// Express Session Config
import sessionConfig from './configs/session-config.js'

// paypal config
import './configs/paypal-config.js'


const app = express()
const PORT = process.env.PORT || 3000

// Express session(config)
app.use(sessionConfig)

// Handlebars Engine (config)
hbsEngine(app)

// Middleware/Routes
app.use(middlewareRouter)
app.use(routerController)

// connect
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
})

