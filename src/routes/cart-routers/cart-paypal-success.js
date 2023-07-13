import { Router } from "express";
import { successPaymentService } from '../../services/cart-routers/cart-paypal-success-service.js'
const cartPaypalSuccess = new Router()

cartPaypalSuccess.get('/success', successPaymentService);

export default cartPaypalSuccess