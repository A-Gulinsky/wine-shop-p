import { Router } from "express";
import { subscribeService } from "../../services/main-routers/subscribe-service.js";
const subscribeToNewsletter = new Router()

subscribeToNewsletter.post('/subscribe', subscribeService)

export default subscribeToNewsletter