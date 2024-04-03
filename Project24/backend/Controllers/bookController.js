const book = require("../Models/book");
module.exports.bookController =async(req, res) => {
    // Extract book details from the request body
    const {
      bookTitle,
      author,
      price,
      quantity,
      receipt,
      bookId,
      numPages
    } = req.body;
  try{
    const newBook = new book({
        bookTitle,
        author,
        price,
        quantity,
        receipt,
        bookId,
        numPages,
        image: "romio" // Store the image filename
      });
  
    const savedBook = await newBook.save();

    if (savedBook) {
      // Book saved successfully
      res.status(201).json({ message: 'Book added successfully' });
    } else {
      // Error saving the book
      res.status(500).json({ message: 'Error adding book' });
    }
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Internal server error' });
  
  }}
