import { Router } from "express"

const orderPage = new Router()

orderPage.get('/orders', (req, res) => {

  res.render(`orders`, {
    
    layout: `orders`,
    user: req.session.user,
    page: 'orders',
    
  })
})

export default orderPage