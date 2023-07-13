import mongoose from "mongoose";

const Schema = mongoose.Schema

const product = new Schema({
  el: {
    type: Object,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  order_id: {
    type: String,
    require: true,
  },
  uniqueId: {
    type: Number,
    require: true,
  },
  mail: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  }

})

const History = mongoose.model('Product', product);

export default History