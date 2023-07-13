import { Router } from "express";
import { getOrdersDataService } from '../../services/order-routers/get-orders-service.js'

const getOrders = new Router()

getOrders.post('/orders', getOrdersDataService);

export default getOrders