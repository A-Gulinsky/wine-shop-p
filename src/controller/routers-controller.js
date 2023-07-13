import express from 'express'
import { Router } from 'express'

// page
import mainPage from '../routes/page-routers/main-page.js';
import cartPage from '../routes/page-routers/cart-page.js';
import orderPage from '../routes/page-routers/order-page.js';
import articlePage from '../routes/page-routers/article-page.js';

// user
import signIn from '../routes/user-routers/sign-in-router.js';
import signUp from '../routes/user-routers/sign-up-router.js';
import logoutRouter from '../routes/user-routers/logout-router.js';

// main page routers
import fetchByFilter from '../routes/main-routers/fetch-by-filter.js';
import fetchByQuery from '../routes/main-routers/fetch-by-query.js';
import fetchById from '../routes/main-routers/fetch-by-id.js';
import btnLoadMore from '../routes/main-routers/btn-load-more.js';
import subscribeToNewsletter from '../routes/main-routers/subscribe.js';
import quantityRouter from '../routes/main-routers/cart-quantity.js';

// cart page routers
import addToCart from '../routes/cart-routers/add-to-cart.js';
import cartHistory from '../routes/cart-routers/cart-history.js';
import removeFromCart from '../routes/cart-routers/remove-from-cart.js';
import updateItem from '../routes/cart-routers/update-quantity.js';
import cartPaypal from '../routes/cart-routers/cart-paypal.js';
import cartPaypalSuccess from '../routes/cart-routers/cart-paypal-success.js';
import historyListRouter from '../routes/cart-routers/cart-history-list.js';

// order page routers
import getOrders from '../routes/order-routers/get-orders.js';
import getHistory from '../routes/order-routers/get-history-orders.js';
import updateOrder from '../routes/order-routers/update-order.js';

// API
import getCities from '../routes/api-routers/get-cities.js';
import getWarehouse from '../routes/api-routers/get-warehouse.js';

const routerController = new Router()

// page
routerController.use(mainPage)
routerController.use(cartPage)
routerController.use(orderPage)
routerController.use(articlePage)

// user
routerController.use(signIn)
routerController.use(signUp)
routerController.use(logoutRouter)

// main page
routerController.use(fetchByFilter)
routerController.use(fetchByQuery)
routerController.use(fetchById)
routerController.use(btnLoadMore)
routerController.use(subscribeToNewsletter)
routerController.use(quantityRouter)

// cartPage
routerController.use(addToCart)
routerController.use(cartHistory)
routerController.use(removeFromCart)
routerController.use(updateItem)
routerController.use(cartPaypal)
routerController.use(cartPaypalSuccess)
routerController.use(historyListRouter)

// API
routerController.use(getCities)
routerController.use(getWarehouse)

// orderPage
routerController.use(getOrders)
routerController.use(getHistory)
routerController.use(updateOrder)


export default routerController

