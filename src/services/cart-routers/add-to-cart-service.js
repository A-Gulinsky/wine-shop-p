import Account from "../../db/models/accounts.js";
import Wine from "../../db/models/wines.js";
import OrderStatus from "../../db/models/order-status.js";

const orderStatus = new OrderStatus()

export const addToCartService = async (req,res) => {
  
  try {

    // session user
    const user = req.session.user;

    // wine _Id , quantity 
    const id = req.body.productId
    const value = req.body.quantity

    // unique Id for order
    const uniqueId = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')

    // if session.user is empty
    if (!user) {
      res.status(401).json({ error: 'You need to sign-in in your Account to choose a wine' });
      return;
    }

    // if such item already exists, add to it
    const itemIndex = user.cart.waiting.findIndex(item => item.id === id);

    if (itemIndex !== -1) { 

      // update user
      const updatedUser = await updateCurrentItem(user, itemIndex, value)

      // save session
      req.session.user = updatedUser
      req.session.save((err) => {
        if (err) {
          console.error(err)
          res.status(500).send('server error')
          return
        }
        res.json(updatedUser)
      })

    // ELSE push new item
    } else { 

      // push new item
      const updatedUser = await pushNewItem(user, value, id, uniqueId, orderStatus)
      

      // update session
      req.session.user = updatedUser;
      req.session.save((err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Server Error');
          return;
        }

        res.json(updatedUser);
      });

    }

  } catch (err) {
    console.log(err)
    res.status(500).send('Server Error');
  }
}

// if such item already exists, add to it
const updateCurrentItem = async (user,itemIndex,value) => {
  
  try {
    
    user.cart.waiting[itemIndex].value += value

    return Account.findOneAndUpdate(
      { _id: user._id },
      { cart: user.cart },
      { new: true }
    );

  } catch (err) {
    console.log(err)
    
  }

}

// push new item
const pushNewItem = async (user, value, id, uniqueId, orderStatus) => {
  
  try {

    // find wine by id
    const data = await Wine.findById(id);
    
    // update user
    return await Account.findOneAndUpdate(
      { _id: user._id },  
      { $push: { 'cart.waiting' : {data, value, id, uniqueId, orderStatus} } },
      { new: true }
    );

  } catch (err) {
    console.log(err)
  }

}