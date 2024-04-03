const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookTitle: {
    type: String,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  bookId: {
    type: String,
    unique: true
  },
  numPages: {
    type: Number,
  },
  image: {
    type: String, // Assuming you store image filenames or URLs
    required: false
  },
  sell_count:{
    type:Number,
    default: 0
  },
  selledPriceTotal:{
    type:Number,
    default: 0
  },
  dimensions:{
    type:String,
  },
  weight:{
    type:String,
  },
  publicationDate:{
    type:String
  }
});

const Book = mongoose.model('Book', bookSchema,'books');

module.exports = Book;
