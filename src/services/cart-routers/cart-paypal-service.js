import Account from "../../db/models/accounts.js";
import paypal from "paypal-rest-sdk";

export const cartPaypalService = async (req, res) => {
  
  try {

    const user = req.session.user;
    const dataPayment = req.body.dataPayment
    const products = req.body.activeProductList;
    const deliveryInstruction = req.body.deliveryObject
    const totalPrice = req.body.total
    
    // payment upon receipt
    if (deliveryInstruction.paid === 'payment-on-delivery') {

      const updateOperations =  await paymentUponReceipt(user,products,deliveryInstruction)
    
      await Account.bulkWrite(updateOperations);

      req.session.user = user;
      req.session.save((err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Server error');
          return;
        }

        setTimeout(() => {
          res.json('/cart');
        }, 2000)
      });

      return
    }

    // choose to pay for shipping
    let description = `products: ${products.map(product => user.cart.waiting.find(item => item.id === product).data.name).join(', ')}`
    
    // payment description
      const payment = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal'
        },
        redirect_urls: {
          return_url: 'https://wine-shop-zhytomyr.cyclic.app/success', // success payment
          cancel_url: 'http://localhost:3000/order/cancel' // unsuccess payment
        },
        transactions: [{
          
          amount: {
            total: totalPrice, // total amount
            currency: 'USD'
          },
          description: description,
          custom: user._id
        }]
      };

    // paypal payment create
    paypal.payment.create(payment, async (error, payment) => {
      if (error) {
        console.error(error);
        res.status(500).send('Server error');
      } else {

        //redirect link
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === 'approval_url') {
            // save all the information to session
            
            req.session.dataPayment = dataPayment
            req.session.product = products
            req.session.deliveryObject = deliveryInstruction  
              
            req.session.save((err) => {
              if (err) {
                console.error(err);
                res.status(500).send('Server error');
                return;
              }
              // Добавляем параметр "user" в URL редиректа
              const redirectUrl = payment.links[i].href;
              res.json({ redirectUrl });
            });
            return;
          }
        }
      }
    });
  
  } catch (err) {
    res.status(500).send(`Server Error`)
  }

}



// update Operation (payment upon receipt)
async function paymentUponReceipt(user,products,deliveryInstruction) {

  try { 

    const deliveryOrderId = Array.from({ length: 8 }, () => Math.floor(Math.random() * 8)).join('')

    return products.map((product) => {

            const waitingItemIndex = user.cart.waiting.findIndex((item) => item.id === product);
      
              if (waitingItemIndex !== -1) {
                const item = user.cart.waiting[waitingItemIndex];
             
                item.orderStatus.delivery = true;
                item.orderStatus.paid = false
                item.orderStatus.ordered = true;
                item.orderStatus.order_number = deliveryOrderId
                item.orderStatus.address = deliveryInstruction
            
                user.cart.ordered.push(item);
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
    
  }

}
