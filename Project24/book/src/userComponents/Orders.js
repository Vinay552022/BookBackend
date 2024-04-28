import React from 'react';
import { Container } from 'react-bootstrap';
import Book_Cover2 from '../components/Images/Book_Cover2.jpg';
import './Dashboard.css';
import { useUser } from '../App';
export default function Orders() {
  const { orders } = useUser();
  console.log(orders);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      <Container className='mt-4 flex-grow-1'>
        {/* <h2>Orders</h2> */}
        {orders.map((order, index) => (
          <div key={index} className='  shadow my-3'>

            <h2 className='text-center'>Order-{index + 1} </h2>{/* Displaying order number */}
            {order.items.map((item, itemIndex) => (
              <div key={itemIndex} className="card  border-0 ">
                <div className="row g-0 align-items-center">
                  <div className="col-md-4">
                    <img src={Book_Cover2} className="img-fluid object-fit-scale p-3"  alt="..." />
                  </div>
                  <div className="col-md-8 ">
                    <div className="card-body">
                      <h3 className="card-title">{item.book.bookTitle}</h3>
                      <div className='card-text fs-5'><i>by </i>{item.book.author}</div>
                      <div className='card-text'><del>₹800</del><b className="fs-5">{'\u20B9'}</b> {item.price}</div>
                      <div className='card-text'><b>ISBN 13</b> :{item.bookId}</div>
                      <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-md-3 form-label mt-1"><h5>Quantity</h5></label>
                        <div className="col-md-3">
                          <input type="number" min={1} className="form-control" value={item.quantity} readOnly/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className='px-4 pb-2'>
            <div className=''><span className='fs-5'>Total Amount : </span>{'\u20B9'}{order.totalAmount}</div>
            <div><span className='fs-5'>Status  : </span><span className= {order.status === 'delivered' ? 'text-success' : (order.status === 'pending' ? 'text-warning' : 'text-primary') }>{order.status}</span></div>
            <div className="mb-3 3 row ">
              <div className='col-md-6 '>
              <span className='fs-5'>Created At : </span>
                {order.createdAt}
              </div>
              <div className='col-md-5'>
                <span className='fs-5'>Delivered At : </span>
                <span className={order.deliveredAt ? 'text-success' : 'text-danger'}>{order.deliveredAt ? order.deliveredAt : "Not Delivered"}</span>
              </div>
            </div>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}