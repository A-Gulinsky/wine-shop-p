import Account from "../../db/models/accounts.js";
import paypal from "paypal-rest-sdk";

export const successPaymentService = async (req, res) => {
  
  try {
    
    const products = req.session.product
    const user = req.session.user
    const dataPayment = req.session.dataPayment
    const deliveryInstruction = req.session.deliveryObject
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    // API PayPal
    const executePayment = {
      payer_id: payerId
    };
    
    paypal.payment.execute(paymentId, executePayment, async(error, payment) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      } else {
      // payment success 
  
      const updateOperations = await updateOperationFunc(products,user,dataPayment,paymentId,deliveryInstruction)
      
      await Account.bulkWrite(updateOperations);

      // save session
      req.session.user = user;
      req.session.save((err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Server error');
          return;
        }

        setTimeout(() => {
          res.redirect('/cart');
        }, 3000)
      });
    }
  });

  } catch (err) {
    res.status(500).send(`Server Error`)
  }

}

// updateOperation
async function updateOperationFunc(products,user,dataPayment,paymentId,deliveryInstruction) {

  try {

    return products.map((product) => {
      const waitingItemIndex = user.cart.waiting.findIndex((item) => item.id === product);


      if (waitingItemIndex !== -1) {
        const item = user.cart.waiting[waitingItemIndex];

        // if reservation - apply such settings
        if (dataPayment.reservation) {
          item.orderStatus.reservation = true;
          item.orderStatus.ordered = true;
          item.orderStatus.paid = true;
          item.orderStatus.order_number = paymentId.slice(-8);
          // if delivery - apply such settings
        } else if (dataPayment.delivery) {
            item.orderStatus.delivery = true;
            item.orderStatus.ordered = true;
            item.orderStatus.paid = true
            item.orderStatus.order_number = paymentId.slice(-8);
            item.orderStatus.address = deliveryInstruction
        }
        
        // push item
        user.cart.ordered.push(item);

        // delete an item that has moved to the status of ordered
        user.cart.waiting.splice(waitingItemIndex, 1);
      }

      return {
        updateOne: {
          filter: { _id: user._id },
          update: {
            'cart.waiting': user.cart.waiting,
            'cart.ordered': user.cart.ordered
          }
        }
      };
    });

  } catch (err) {
    console.log(err)
  }
}