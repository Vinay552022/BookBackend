import React from 'react';
import book2 from './Images/Book_Cover2.jpg';
import book3 from './Images/Book_Cover3.jpg';
import Video from './VID-20240403-WA0001.mp4';
import { Link } from 'react-router-dom';

const Homepagevideo = () => {
  const componentStyle = {
    backgroundColor: 'white',
    padding: '40px'
  };

  const videoStyle = {
    width: '100%',
    display: 'block',
    borderRadius: '20px',
  };

  const h1Style = {
    fontFamily: "'Cinzel', serif",
    color: 'black',
    textTransform: 'uppercase',
    fontSize: '2.4rem',
    textAlign: 'center'
  };

  const pStyle = {
    color: '#fff',
    fontFamily: "'Lato', sans-serif",
    textAlign: 'center',
    fontSize: '0.8rem',
    lineHeight: '150%',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  };

  const buttonWrapperStyle = {
    marginTop: '18px',
  };

  const btnStyle = {
    border: 'none',
    padding: '12px 24px',
    borderRadius: '24px',
    fontSize: '0.8rem',
    letterSpacing: '2px',
    cursor: 'pointer',
  };

  const fillStyle = {
    background: 'rgba(0, 212, 255, 0.9)',
    color: 'rgba(255,255,255,0.95)',
    filter: 'drop-shadow(0)',
    fontWeight: 'bold',
  };

  const containerStyle = {
    margin: '0 auto',
  };

  return (
<div className={`p-2 ${window.innerWidth <= 768 ? 'reduced-padding' : ''}`} style={containerStyle}>

      <h1 style={h1Style} className='mt-2'>Haelan Homeopathy</h1>
      <br />
      <br />
      <div className='p-2' style={containerStyle}>
        <div className="container p-2">
          <div style={videoStyle} className="wrapper mt-1">
            <video controls autoPlay loop muted style={videoStyle}>
              <source src={Video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="mt-4">
            <h1 style={h1Style} className='mt-2 text-center'>The Essentials of Materia Medica</h1>
            <div style={buttonWrapperStyle} className="button-wrapper d-flex justify-content-center align-items-center">
              <button style={{ ...btnStyle, ...fillStyle }} className="btn fill"><Link className='text-decoration-none text-dark'  to="/form">
                Buy now
              </Link></button>
            </div>
          </div>
        </div>
      </div>
      <br /><br />

      <div className="container mb-5" >
        <div className="position-relative mb-5 text-center text-muted bg-body border border-dashed rounded-5">
          <div className="row ">
            <div className="col-lg-6">
              <div className='container'>
                <img src={book2} className='img-fluid rounded-5' width={800} alt="Book Cover 2" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className='container'>
                <img src={book3} className='img-fluid rounded-5' width={800} alt="Book Cover 3" />
              </div>
            </div>
          </div>
          <h1 className="text-body-emphasis mb-1">Key Points of the Book</h1>
          <ul className="col-lg-8 col-sm-10 mx-auto mb-4 " style={{ textAlign: 'left' }}>
            <li className="mt-2">STUDY WITH FABULOUS ILLUSTRATIONS</li>
            <li className="mt-2">ALL KEYNOTES COVERED AT ONE PLACE</li>
            <li className="mt-2">EASY APPROACH TO UNDERSTANDING CONSTITUTION, MIASMS AND SPHERE OF ACTION BY OBSERVING PIE DIAGRAMS, TABLES, AND ILLUSTRATIONS.</li>
            <li className="mt-2">STUDY PHYSIO-PATHOLOGICAL ACTION THROUGH FLOW CHARTS IN THE SIMPLEST WAY POSSIBLE.</li>
            <li className="mt-2">INDEPTH COMPARATIVE STUDY OF ESSENTIAL DRUGS WITH MATCHING SYMPTOMATOLOGY AT THE SAME PLACE.</li>
            <li className="mt-2">FOR THE FIRST TIME NOTEWORTHY RUBRICS OF THE REMEDY ARE MENTIONED SO THAT YOU CAN EMPHASIZE THE MOST RELEVANT SYMPTOMS OF THE REMEDY IN REPERTORIAL LANGUAGE.</li>
            <li className="mt-2">VERY PRECIOUS CLINICAL AND DOSAGE TIPS THAT HAVE UNPARALLELED IMPORTANCE IN PRACTICE</li>
          </ul>
          <div style={buttonWrapperStyle} className="button-wrapper mb-5">
            <button style={{ ...btnStyle, ...fillStyle }} className="btn fill"><Link className="text-decoration-none text-dark" to="/form">
              Buy now
            </Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepagevideo;