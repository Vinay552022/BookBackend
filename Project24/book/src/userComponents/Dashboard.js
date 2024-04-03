import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import bg_img from '../components/Images/bg_img.avif'
import Book_Cover2 from '../components/Images/Book_Cover2.jpg';
import { useUser } from '../App';

const Dashboard = () => {
    const navigate = useNavigate();
    const {data,setData} = useUser();
    console.log(data,"he;llo");
    const handleBookClick = (card) => {
        navigate('/SelectedBook', { state: { bookData: card} }); 
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:4000/getbooks');
    //             console.log(response.data);
    //             setData(response.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     fetchData();
    // }, []);

    return (
        <div style={{backgroundImage: `url(${bg_img})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
            height:'100vh'}}>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {data.map((card, index) => (
                        <div key={index} className="col mt-2 " onClick={() => handleBookClick(card)}>
                        <div className="card card-hover shadow-lg" >
                        <img src={Book_Cover2} className="card-img-top object-fit-scale     p-3" alt="..." />
                        <div className="card-body">
                            <h3 className="card-title text-center">{card.bookTitle}</h3>
                            <div className='row'>
                            <b className="col card-text">Author</b>
                            <div className="col card-text">{card.author}</div>
                            </div>
                            <div className='row'>
                            <b className="col card-text">Price</b>
                            <div className="col card-text "><b className="fs-5">{'\u20B9'}</b>{card.price}</div>
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
