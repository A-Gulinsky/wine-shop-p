import { Router } from 'express'

const routerController = new Router()

// page
import mainPage from '../routes/page-routers/main-page.js';

// page
routerController.use(mainPage)

export default routerController
