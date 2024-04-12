import { Router } from "express"; 
import Account from "../../db/models/accounts.js";

const cartPage = new Router()

cartPage.get('/cart', async(req, res) => {

  res.render('cart', {
    layout: 'cart',
    user: req.session.user,
    page: `cart`,
  });
  
  // ОБНОВЛЕНИЕ ДАННЫХ
  if (!req.session.user) {
    return
  }

  const userId = req.session.user._id
  const updatedAccount = await Account.findById(userId)
  req.session.user = updatedAccount
  req.session.save((err) => {
    if (err) {
      console.error(err)
      res.status(500).send('server error')
      return
    }
        
  })
});

export default cartPage