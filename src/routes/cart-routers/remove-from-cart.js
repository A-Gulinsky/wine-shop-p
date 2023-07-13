import { Router } from "express";
import { removeFromCartService } from "../../services/cart-routers/remove-from-cart-service.js";

const removeFromCart = new Router()

removeFromCart.post('/remove-to-cart', removeFromCartService)

export default removeFromCart