import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Book_Cover2 from '../components/Images/Book_Cover2.jpg';
import { useUser } from '../App';
import { useNavigate } from 'react-router-dom';

export default function BookStats(props) {
  const {books,setBooks} = props;
  console.log(books);
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container className='mt-4 flex-grow-1'>
        <h2>Stats</h2>
        {Object.keys(books).length!=0 && books.map((card, index) => (
          <div key={index} className="card mb-3 shadow-lg " >
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
                  <div className='card-text'><b>books sold    :   </b>{card.sell_count}</div>
                  <div className='card-text'><b>Total sold price    :   </b>{card.selledPriceTotal}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}