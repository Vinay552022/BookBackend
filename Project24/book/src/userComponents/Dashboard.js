import React  from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import Book_Cover2 from '../components/Images/Book_Cover2.jpg';
import { useUser } from '../App';

const Dashboard = () => {
    const { data } = useUser();
    console.log(data, "hello");
    return (
        <div >
            <div className="container ">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {data.map((card, index) => (
                        <div key={index} className="col mt-2 ">
                            <div className="card card-hover shadow-lg p-4" >
                                <img src={Book_Cover2} className=" object-fit-scale  p-3" alt="..." />
                                <div className="card-body">
                                    <h3 className="card-title text-center">{card.bookTitle}</h3>
                                    <div className='row'>
                                        <b className="col card-text">Author</b>
                                        <div className="col card-text">{card.author}</div>
                                    </div>
                                    <div className='row'>
                                        <b className="col card-text">Price</b>
                                        <div className="col card-text "><del>₹800</del> ₹{card.price} </div>
                                    </div>
                                    <div className='d-grid gap-2 col-6 mt-4 mx-auto'>
                                        <Link to={`/book/${index}`} className='btn btn-dark'>View</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
