import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const BuyBooks = (props) => {
  const location = useLocation()
  let booksData = props.booksData.data
  let adminData = props.userData//admin  data
  let userData = location.state//user data
  console.log(adminData, userData, booksData)
  const [book, setBook] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleBookChange = (e) => {
    const selectedBookId = e.target.value;
    const selectedBook = booksData.find(book => book.bookId === selectedBookId);
    if (selectedBook) {
      setBook(selectedBookId);
      setPrice(selectedBook.price);
      setTotalPrice(selectedBook.price * quantity);
    }
  };

  const handleQuantityChange = (e) => {
    const selectedQuantity = parseInt(e.target.value);
    setQuantity(selectedQuantity);
    setTotalPrice(price * selectedQuantity);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have an endpoint for placing orders
      const response = await axios.post('http://localhost:4000/placeOrder', {
        book,
        quantity,
        totalPrice,
        paymentMethod,
      });
      if (!response.data) {
        throw new Error('Failed to place order');
      }
      setNotification({ message: response.data.message, type: 'success' });
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setNotification({ message: error.response.data.message, type: 'danger' });
      } else {
        setNotification({ message: 'An error occurred', type: 'danger' });
      }
    }
  };

  return (
    <div className="container mt-3 rounded shadow">
      {/* Notification */}
      {notification.message && (
        <div className={`alert alert-${notification.type}`} role="alert">
          {notification.message}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group p-3">
          <label htmlFor="book" className="m-2">Select Book:</label>
          <select
            className="form-control mb-"
            id="book"
            onChange={handleBookChange}
            value={book}
            required
          >
            <option value="" disabled>Select Book</option>
            {booksData.map(book => (
              <option key={book.bookId} value={book.bookId}>{book.bookTitle}</option>
            ))}
          </select>
        </div>
        <div className="form-group p-3">
          <label htmlFor="quantity" className="m-2">Quantity:</label>
          <input
            type="number"
            className="form-control mb-"
            id="quantity"
            min="1"  // Set minimum value to 1
            value={quantity}
            onChange={handleQuantityChange}
            required
          />

        </div>
        <div className="form-group p-3">
          <label htmlFor="totalPrice" className="m-2">Total Price:</label>
          <input
            type="text"
            className="form-control mb-"
            id="totalPrice"
            value={totalPrice}
            readOnly
          />
        </div>
        <div className="form-group p-3">
          <label htmlFor="paymentMethod" className="m-2">Payment Method:</label>
          <select
            className="form-control mb-"
            id="paymentMethod"
            onChange={handlePaymentMethodChange}
            value={paymentMethod}
            required
          >
            <option value="" disabled>Select Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
          </select>
        </div>
        {quantity>0 &&<div className="form-group p-3">
          <button type="submit" className="btn btn-primary">Place Order</button>
        </div>}
      </form>
    </div>
  );
};

export default BuyBooks;
