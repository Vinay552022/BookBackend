import React, { useState } from 'react';
import axios from 'axios';

const BookForm = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [receipt, setReceipt] = useState('');
  const [bookId, setBookId] = useState('');
  const [numPages, setNumPages] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert image to base64 string
    const reader = new FileReader();
    reader.onloadend = async() => {
      const imageData = reader.result;
      // Create a JavaScript object to represent the book details
      const bookDetails = {
        bookTitle,
        author,
        price,
        quantity,
        receipt,
        bookId,
        numPages,
        image: imageData, // Include the base64 image data in the book details
      };

      // Send data to backend
      try {
        const response = await axios.post('/sell-book', bookDetails);
        console.log('Response:', response.data);
        // Reset form fields after successful submission
        setBookTitle('');
        setAuthor('');
        setPrice('');
        setQuantity('');
        setReceipt('');
        setBookId('');
        setNumPages('');
        setImage(null);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    reader.readAsDataURL(image); // Read the image file as a data URL
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-center vh-100">
        <form
          onSubmit={handleSubmit}
          className="p-5 shadow-lg bg-white rounded"
          style={{ minWidth: '400px', maxWidth: '450px' }}
        >
          <h2 className="text-center mb-4">Sell Book</h2>
          <div className="form-group">
            <label>Book ID:</label>
            <input
              type="text"
              className="form-control"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Book Title:</label>
            <input
              type="text"
              className="form-control"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input
              type="text"
              className="form-control"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="text"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Number of Pages:</label>
            <input
              type="number"
              className="form-control"
              value={numPages}
              onChange={(e) => setNumPages(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Quantity:</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Receipt:</label>
            <textarea
              className="form-control"
              value={receipt}
              onChange={(e) => setReceipt(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Upload Image:</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-dark btn-block">Sell Book</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;