import { Router } from "express";
import { historyList } from "../../services/cart-routers/cart-history-list-service.js";

const historyListRouter = new Router

historyListRouter.post(`/history-list`, historyList)

export default historyListRouter