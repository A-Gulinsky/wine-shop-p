import { Router } from "express";
import { updateQuantityService } from '../../services/cart-routers/update-quantity-service.js'

const updateItem = new Router()


updateItem.post('/update-item', updateQuantityService)

export default updateItem