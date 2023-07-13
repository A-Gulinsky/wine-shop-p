import Account from "../../db/models/accounts.js";
import History from "../../db/models/history.js";
import nodemailer from 'nodemailer';
import 'dotenv/config'

const pass = process.env.mailPass

export const updateOrderService = async (req, res) => {
  
  try {

    const order = req.body.currentOrder
    
    await updateOrderSettings(order)

    res.json(`work`)

  } catch (err) {
    res.status(500).send(`Server Error`)
  }


}

async function updateOrderSettings(order) {

  try {

    // add item in history orders
    const historyItem = new History({
      el: order.el,
      name: order.name,
      surname: order.surname,
      username: order.username,
      mail: order.email,
      order_id: order.el.orderStatus._id,
      uniqueId: order.el.uniqueId
    })

    // change order processed 
    const filter = { _id: order.id};
    const updateProcessed = {
      $set: {
        'cart.ordered.$[element].orderStatus.processed': true
      }
    };
  
    const optionsProcessed = {
      arrayFilters: [{ 'element.uniqueId': order.el.uniqueId }]
    };
    
    await Account.findOneAndUpdate(filter, updateProcessed, optionsProcessed);

    // remove item from ordered
    const updatePull = {
      $pull: {
        'cart.ordered': { uniqueId: order.el.uniqueId }
      }
    };
    
    await Account.findOneAndUpdate(filter, updatePull);

    // add item into processed
    const updatePush = {
      $push: {
        'cart.processed': order.el
      }
    };
    await Account.findOneAndUpdate(filter, updatePush);

    // SAVE
    await historyItem.save();
  
    // mail settings
    const transporter = nodemailer.createTransport({

      host: `smtp.gmail.com`,
      port: 465,
      secure: true,
      auth: {
        user: 'wineshopzhytomyr@gmail.com',
        pass: pass
      }
    })


    let text = ``
    if (order.el.orderStatus.reservation) {
      text = `Dear ${order.name} ${order.surname}, your order is reserved. We are waiting for you at the store at the point of issue`
    } else if (order.el.orderStatus.delivery) {
        text = `Dear ${order.name} ${order.surname}, your order has been processed. Wait for messages from the delivery service`
    }

    const mailOptions = {
      from: `wineshopzhytomyr@gmail.com`,
      to: order.email,
      subject: `Wine Shop: Order №${order.el.orderStatus.order_number}`,
      text: text
    }
  
    // send mail
    transporter.sendMail(mailOptions, (error, info) => {

      if (error) {
        console.log(`error`, error)
      } else {
        console.log(`success`, info.response)
      }
    })

  } catch (err) {
    console.log(err)
  }
}