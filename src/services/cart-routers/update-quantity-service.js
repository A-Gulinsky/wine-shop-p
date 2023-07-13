import Account from "../../db/models/accounts.js";

export const updateQuantityService = async (req, res) => {
  
  try {
    
    const value = req.body.itemQuantity
    const user = req.session.user
    const id = req.body.currentItemId

    const itemIndex = user.cart.waiting.findIndex(item => item.id === id);

    user.cart.waiting[itemIndex].value = value

    const updateUser = await Account.findOneAndUpdate(
      { _id: user._id },
      { 'cart.waiting': user.cart.waiting},
      { new: true }
    );
  
    res.json(user.cart.waiting[itemIndex].value)

    req.session.user = updateUser
    req.session.save((err) => {
      if (err) {
        console.error(err)
        res.status(500).send('Server Error')
        return
      }  
    })

  } catch (err) {
    console.log(err)
    res.status(500).send(`Server Error`)
  }

}