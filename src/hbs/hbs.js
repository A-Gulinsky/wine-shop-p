import path from 'path'
import exphbs from 'express-handlebars'
import *as helpers from './helpers.js'

const __dirname = path.resolve()

const hbs = exphbs.create({
  defaultLayout: 'index',
  extname: 'hbs',
  layoutsDir: path.resolve(__dirname, 'src/hbs/layouts'),
  helpers: helpers
})

export default hbs