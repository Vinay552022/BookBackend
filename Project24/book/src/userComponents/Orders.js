import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Book_Cover2 from '../components/Images/Book_Cover2.jpg';
import './Dashboard.css';
import { useUser } from '../App';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
  const { orders, setOrders } = useUser();
  const { userData, setUserData } = useUser();
  console.log(orders);
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      <Container className='mt-4 flex-grow-1'>
      <h2>Orders</h2>
        {orders.map((order, index) => (
          <div key={index} className='border border-2'>

            <h4 className='text-center'>Order{index + 1} </h4>{/* Displaying order number */}
            <div>Total Amount : {'\u20B9'}{order.totalAmount}</div>
            <div>Status  : <span className={order.status === 'delivered' ? 'text-success' : (order.status === 'pending' ? 'text-warning' : 'text-primary')}>{order.status}</span></div>
            <div className="mb-3 mt-3 row ">
              <div className='col-6'>
                  <div>Created At : {order.createdAt}</div>
              </div>
              <div className='col-5 text-end'>
                  Delivered At : <span className={order.deliveredAt ? 'text-success' : 'text-danger'}>{order.deliveredAt ? order.deliveredAt : "Not Delivered"}</span>
              </div>
            </div>


            {order.items.map((item, itemIndex) => (
              <div key={itemIndex} className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={Book_Cover2} className="card-img-top rounded-start" alt="..." />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h3 className="card-title">{item.book.bookTitle}</h3>
                      <div className='card-text fs-5'>{item.book.author}</div>
                      <div className='card-text'><b className="fs-4">{'\u20B9'}</b>{item.price}</div>
                      <div className='card-text'>{item.bookId}</div>
                      <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-md-2 form-label"><b>Quantity</b></label>
                        <div className="col-md-3">
                          <input type="number" min={1} className="form-control" value={item.quantity} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </Container>
    </div>
  );
}
