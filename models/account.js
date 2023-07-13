import mongoose from "mongoose";

const Schema = mongoose.Schema

const accountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  }
})

const Account = mongoose.model('Account', accountSchema);

export default Account