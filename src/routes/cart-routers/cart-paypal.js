import { Router } from "express";
import { cartPaypalService } from '../../services/cart-routers/cart-paypal-service.js'


const cartPaypal = new Router()

cartPaypal.post('/cart/order', cartPaypalService);



export default cartPaypal