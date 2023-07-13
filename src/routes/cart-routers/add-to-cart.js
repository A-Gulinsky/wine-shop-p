import { Router } from "express";
import { addToCartService } from "../../services/cart-routers/add-to-cart-service.js";


const addToCart = new Router()

addToCart.post('/add-to-cart', addToCartService);

export default addToCart