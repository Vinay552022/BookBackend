import React, { useState } from 'react';
import { useUser } from '../App';
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Book_Cover2 from '../components/Images/Book_Cover2.jpg';
import './Dashboard.css';
import axios from 'axios';

const PlaceOrder = () => {
  const { userData, setUserData, orders, setOrders, cart, setCart } = useUser();
  const [stringAddress, setStringAddress] = useState(`${userData.currentAddress.lane1}, ${userData.currentAddress.lane2}, ${userData.currentAddress.district}, ${userData.currentAddress.state}, ${userData.currentAddress.pincode}`);
  const location = useLocation();
  const orderData = location.state.orderData;
  const t = location.state.t;

  // Calculate shipping charges
  const shippingCharges = orderData.length === 20 ? 0 : 79;

  const buy = async () => {
    const { email, userType } = userData;
    const totalAmount = t + shippingCharges; // Add shipping charges to the total amount
    const items = orderData.map(card => ({
      bookId: card.bookId,
      quantity: card.quantity,
      price: card.price,
    }));

    const orderDetails = {
      email,
      userType,
      items,
      totalAmount
    };

    try {
      const response = await axios.post('https://bookbackend-1.onrender.com/placeOrder', orderDetails);
      console.log('Response:', response.data);
      var arr = [...orders];
      const item = orderData.map(card => ({
        bookId: card.bookId,
        quantity: card.quantity,
        price: card.price,
        book: card
      }));
      var date = new Date();
      arr.push({
        "createdAt": date.toString(),
        "items": item,
        "email": email,
        "status": "pending",
        "totalAmount": totalAmount,
        "trackingNumber": null,
        "userType": userType,
      });
      setOrders(arr);
      setCart([]);
      const k = { ...userData };
      k.cart = [];
      setUserData(k);
      
      // Redirect to PhonePe payment gateway
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container mt-2'>
      <h3 className='text-center'>Place Order</h3>
      <div>
        <div>
          <h4>Select Delivery Address</h4>
          <div>
            <input className="form-control border-0" type="text" placeholder="Default input" aria-label="default input example" value={stringAddress} />
          </div>
        </div>
        <hr />
        <div>
          <h2 className='text-center'>ITEMS</h2>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
              <Container className='mt-4 flex-grow-1'>
                {orderData.map((card, index) => (
                  <div key={index} className="card" >
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={Book_Cover2} className=" card-img-top rounded-start" alt="..." />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h3 className="card-title">{card.bookTitle}</h3>
                          <div className='card-text fs-5'>{card.author}</div>
                          <div className='card-text'><b className="fs-4">{'\u20B9'}</b>{card.price}</div>
                          <div className='card-text'>{card.bookId}</div>
                          <div className="mb-3 row">
                            <label htmlFor="staticEmail" className="col-md-2 form-label"><b>Quantity</b></label>
                            <div className="col-md-3">
                              <input type="number" min={1} className="form-control" value={card.quantity} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Container>

              <div className='mt-3 bg-light'>
                <Container>
                  <div className='row'>
                    <div className='col-sm-5 col-md-3 text-center'><b>Total</b> ( {orderData.length} items )</div>
                    <div className='col-sm-3 col-md-3 text-center'><b className=""><span className='fs-4'>{'\u20B9'}</span>{t}</b></div>
                  </div>
                  {shippingCharges > 0 && (
                    <div className='row'>
                      <div className='col-sm-5 col-md-3 text-center'>Shipping Charges</div>
                      <div className='col-sm-3 col-md-3 text-center'><b className=""><span className='fs-4'>{'\u20B9'}</span>{shippingCharges}</b></div>
                    </div>
                  )}
                  <div className='row'>
                    <div className='col-sm-5 col-md-3 text-center'><b>Total Amount</b></div>
                    <div className='col-sm-3 col-md-3 text-center'><b className=""><span className='fs-4'>{'\u20B9'}</span>{t + shippingCharges}</b></div>
                  </div>
                </Container>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div className=' d-grid gap-2 col-2 mt-4 mx-auto'>
            <button className='btn btn-dark ' >Pay through PhonePe gateway</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
