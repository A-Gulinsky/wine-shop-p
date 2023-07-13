import hbs from "../hbs/hbs.js";

export const hbsEngine = async (app) => {
  app.engine('hbs', hbs.engine)
  app.set('view engine', 'hbs');
  app.set('views', 'src/hbs')
}