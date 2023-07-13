import { Router } from "express";
import Account from '../../db/models/accounts.js'

const quantityRouter = new Router()

quantityRouter.post('/cart-quantity', async(req, res) => {
    
  try {

    const user = req.session.user

    if (!user) {
      return
    }

  const quantity = user.cart.waiting.length
  
  res.status(200).json(quantity)

  } catch (err) {
    res.status(500).send(`Something wrong`)
  }

})

export default quantityRouter