import React from 'react';
import book2 from './Images/Book_Cover2.jpg';
import book3 from './Images/Book_Cover3.jpg';
import Video from './VID-20240403-WA0001.mp4';
import { Link } from 'react-router-dom';

const Homepagevideo = () => {
  const componentStyle = {
    backgroundColor: '#1B2635', // New background color
    padding: '40px' // Rounded edges for the component
  };

  const videoStyle = {
    width: '100%',
    display: 'block',
    borderRadius: '20px', // Rounded edges for the video
  };

  const h1Style = {
    fontFamily: "'Cinzel', serif",
    color: 'rgba(255,255,255,0.98)',
    textTransform: 'uppercase',
    fontSize: '2.4rem',
    textAlign: 'center' // Center align the title
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
    // Limit container width for smaller screens
    
    margin: '0 auto',
  };

  return (
    <div className='' style={componentStyle}>
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
            {/* <p style={pStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
            <div style={buttonWrapperStyle} className="button-wrapper d-flex justify-content-center align-items-center">
              <button style={{ ...btnStyle, ...fillStyle }} className="btn fill"><Link className='text-decoration-none text-dark'  to="/form">
            Register now
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
          <h1 className="text-body-emphasis">Key Points of the Book</h1>
          <ul className="col-lg-8 col-sm-10 mx-auto mb-4 ">
            <li>STUDY WITH FABULOUS ILLUSTRATIONS</li>
            <li>ALL KEYNOTES COVERED AT ONE PLACE</li>
            <li>EASY APPROACH TO UNDERSTANDING CONSTITUTION, MIASMS AND SPHERE OF ACTION BY OBSERVING PIE DIAGRAMS, TABLES, AND ILLUSTRATIONS.</li>
            <li>STUDY PHYSIO-PATHOLOGICAL ACTION THROUGH FLOW CHARTS IN THE SIMPLEST WAY POSSIBLE.</li>
            <li>INDEPTH COMPARATIVE STUDY OF ESSENTIAL DRUGS WITH MATCHING SYMPTOMATOLOGY AT THE SAME PLACE.</li>
            <li>FOR THE FIRST TIME NOTEWORTHY RUBRICS OF THE REMEDY ARE MENTIONED SO THAT YOU CAN EMPHASIZE THE MOST RELEVANT SYMPTOMS OF THE REMEDY IN REPERTORIAL LANGUAGE.</li>
            <li>VERY PRECIOUS CLINICAL AND DOSAGE TIPS THAT HAVE UNPARALLELED IMPORTANCE IN PRACTICE</li>
          </ul>
          <div style={buttonWrapperStyle} className="button-wrapper mb-5">
            <button style={{ ...btnStyle, ...fillStyle }} className="btn fill"><Link className="text-decoration-none text-dark" to="/form">
            Register now
          </Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepagevideo;
