import mongoose from "mongoose";

const Schema = mongoose.Schema

const wineSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  characteristics: {
    grape_varieties: {
      type: String,
      required: true
    },
    fermentation: {
      type: String,
      required: true
    },
    bouquet: {
      type: String,
      required: true
    },
    taste: {
      type: String,
      required: true
    },
    serving_suggestions: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    alcohol: {
      type: String,
      required: true
    },
    wine_img: {
      type: String,
      required: true
    }
  },
  reviews: [{
    author: {
      type: String,
      required: true 
    },
    comment: {
      type: String,
      required: true
    }
  }]
});

const Wine = mongoose.model('Wine', wineSchema);

export default Wine