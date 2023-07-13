import Account from "../../db/models/accounts.js";

// add to history processed items
export const cartHistoryService = async (req, res) => {
  
  try {
    
    const user = req.session.user;

    // add to history
    const storyUpdate = await user.cart.processed.map((item) => {
    
      const updatedProcessedUserCart = [];

      user.history_cart.push(item)
      user.cart.processed = updatedProcessedUserCart

      return {
        updateOne: {
          filter: { _id: user._id },
          update: {
            history_cart: user.history_cart,
            'cart.processed': updatedProcessedUserCart, 
          }
        }
      }
    })

    await Account.bulkWrite(storyUpdate);

    // save
    req.session.user = user;
    req.session.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
      }

      res.json('Cart updated successfully');
    });
    
  } catch(err) {
      res.status(500).send(`Server Error`)   
  }

}