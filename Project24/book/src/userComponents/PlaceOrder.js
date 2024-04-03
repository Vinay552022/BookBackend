import React, { useState } from 'react'
import { useUser } from '../App';
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Book_Cover2 from '../components/Images/Book_Cover2.jpg';
import './Dashboard.css';
import axios from 'axios';

const PlaceOrder = () => {
    const { userData, setUserData,orders,setOrders } = useUser(); 
    const [stringAddress,setStringAddress]= useState(`${userData.currentAddress.lane1} ,${userData.currentAddress.lane2} , ${userData.currentAddress.district} , ${userData.currentAddress.state} , ${userData.currentAddress.pincode}`);
    const location = useLocation();
    const orderData = location.state.orderData;
    const t=location.state.t;
    
    const buy =  async() => {
      const {email,userType}=userData;
      console.log(email);
      const totalAmount=t;
      const items = orderData.map(card => ({
        bookId: card.bookId,
        quantity: card.quantity,
        price: card.price,
        
    }));
    console.log(items);
      const orderDetails = {
        email,
        userType,
        items,
        totalAmount
      };
      console.log(orderDetails);
        try {
          const response = await axios.post('http://localhost:4000/placeOrder', orderDetails);
          console.log('Response:', response.data);
          console.log(orders);
          var arr=[...orders];
          const item = orderData.map(card => ({
            bookId: card.bookId,
            quantity: card.quantity,
            price: card.price,
            book:card
        }));
        var date=new Date();
          arr.push({
            "createdAt":date.toString(),
            "items":item,
            "email":email,
            "status":"pending",
            "totalAmount":totalAmount,
            "trackingNumber":null,
            "userType":userType,
          })
          console.log(arr);
          setOrders(arr);
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
                <input class="form-control border-0" type="text" placeholder="Default input" aria-label="default input example" value={stringAddress}/>
            </div>
          </div>
            <hr/>
            <div>
              <h4>Items</h4>
              <div>
              <div style={{ display: 'flex', flexDirection: 'column', minHeight: '60vh' }}>
      <Container className='mt-4 flex-grow-1'>
        {orderData.map((card, index) => (
          <div key={index} className="card mb-3 " >
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
                      <input type="number" min={1} className="form-control" value={card.quantity}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Container>

      <div className='sticky-bottom bg-light py-2'>
        <Container>
          <div className='row'>
            <div className='col-sm-5 col-md-3 text-center'><b>Total</b> ( {orderData.length} items )</div>
            <div className='col-sm-3 col-md-3 text-center'><b  className=""><span className='fs-4'>{'\u20B9'}</span>{t}</b></div>
          </div>
        </Container>
      </div>
    </div>
              </div>
            </div>
            <hr/>
            <div>
              <h4>Payment</h4>
              <div>
              <button className='btn btn-info' onClick={buy}>Buy</button>
              </div>
            </div>

        </div>
    </div>
  )
}

export default PlaceOrder
