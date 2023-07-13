import mongoose from "mongoose";

const Schema = mongoose.Schema

const orderStatus = new Schema({
  processed: {
    type: Boolean,
    default: false
  },
  ordered: {
    type: Boolean,
    default: false
  },
  paid: {
    type: Boolean,
    default: false
  },
  reservation: {
    type: Boolean,
    default: false
  },
  delivery: {
    type: Boolean,
    default: false
  },
  order_number: {
    type: String,
    default: null
  }
})

const OrderStatus = mongoose.model('order', orderStatus);

export default OrderStatus