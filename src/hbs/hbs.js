import path from 'path'
import exphbs from 'express-handlebars'

const __dirname = path.resolve()

const hbs = exphbs.create({
  defaultLayout: 'index',
  extname: 'hbs',
  layoutsDir: path.resolve(__dirname, 'src/hbs/layouts')
})

export default hbs