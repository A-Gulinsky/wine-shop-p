import { Router } from "express";
import { cartHistoryService } from "../../services/cart-routers/cart-btn-add-to-history-service.js";

const cartHistory = new Router()


cartHistory.post('/cart/story',cartHistoryService);

export default cartHistory