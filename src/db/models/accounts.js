import mongoose from "mongoose";

const Schema = mongoose.Schema

const accountSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true 
  },

  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: `user`
  },
   cart: {
    waiting: {
      type: Array,
      default: []
    },
    ordered: {
      type: Array,
      default: []
    },
    processed: {
      type: Array,
      default: []  
    }
  },
  history_cart: {
    type: Array,
    default: []
   }
})

accountSchema.methods.checkPassword = function (password) {
  return this.passwordHash === hash(password);
};

const Account = mongoose.model('Account', accountSchema);

export default Account