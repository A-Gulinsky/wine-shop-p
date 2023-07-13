import { Router } from "express";
import { updateOrderService } from "../../services/order-routers/update-order-service.js";

const updateOrder = new Router()

updateOrder.post('/update-order', updateOrderService);

export default updateOrder