import React from 'react';
import book2 from './Images/Book_Cover2.jpg';
import book3 from './Images/Book_Cover3.jpg';
import Video from './VID-20240403-WA0001.mp4';

const Homepagevideo = () => {
  const bgcolor = {
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
    backgroundColor: 'rgba(17, 25, 40, 0.25)',
    filter: 'drop-shadow(0 30px 10px rgba(0,0,0,0.125))',
  };
  const containerStyle = {
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.125)',
    padding: '38px',
    width: '1300px',
    height: '700px',
    filter: 'drop-shadow(0 30px 10px rgba(0,0,0,0.125))',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    justifyContent: 'center',
    textAlign: 'center',
  };

  const bannerImageStyle = {
    marginTop: "40px",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100%',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255, 0.255)',
  };

  const h1Style = {
    fontFamily: "'Righteous', sans-serif",
    color: 'rgba(255,255,255,0.98)',
    textTransform: 'uppercase',
    fontSize: '2.4rem',
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
    transition: 'all .3s ease',
  };
  const videoContainerStyle = {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const videoStyle = {
    width: '100%',
    display: 'block',
  };


  return (
    <div className='' style={bgcolor}>
      <br />
      <br />
      <div className='p-4'>
        <div  className="container p-2">
          <div style={bannerImageStyle} className="wrapper mt-1">
            <video controls autoPlay loop muted style={videoStyle}>
              <source src={Video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="mt-5">

          </div>
          <h1 style={h1Style} className='mt-2 text-center'>Materia Medic</h1>
          <p style={pStyle}>Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit.</p>
          <div style={buttonWrapperStyle} className="button-wrapper d-flex justify-content-center align-items-center">
            <button style={{ ...btnStyle, ...fillStyle }} className="btn fill">BUY NOW</button>
          </div>
        </div>
      </div>
      <br /><br /><br /><br /><br />


      <div class="container mb-5">
        <div class="position-relative mb-5 text-center text-muted bg-body border border-dashed rounded-5">
          <div className="row">
            <div className="col-lg-6">
              <div className='container-fluid'>
                <img src={book2} className='img-fluid' width={800}></img>
              </div>
            </div>
            <div className="col-lg-6">
              <div className='container-fluid'>
                <img src={book3} className='img-fluid' width={800}></img>
              </div>
            </div>
          </div>
          <h1 class="text-body-emphasis">Key Points of the Book</h1>
          <ul class="col-lg-6 mx-auto mb-4 list-unstyled">
            <li >STUDY WITH FABULOUS ILLUSTRATIONS</li>
            <li>ALL KEYNOTES COVERED AT ONE PLACE</li>
            <li>EASY APPROACH TO UNDERSTANDING CONSTITUTION, MIASMS AND SPHERE OF ACTION BY OBSERVING PIE DIAGRAMS, TABLES, AND ILLUSTRATIONS.</li>
            <li>STUDY PHYSIO-PATHOLOGICAL ACTION THROUGH FLOW CHARTS IN THE SIMPLEST WAY POSSIBLE.</li>
            <li>INDEPTH COMPARATIVE STUDY OF ESSENTIAL DRUGS WITH MATCHING SYMPTOMATOLOGY AT THE SAME PLACE.</li>
            <li>FOR THE FIRST TIME NOTEWORTHY RUBRICS OF THE REMEDY ARE MENTIONED SO THAT YOU CAN EMPHASIZE THE MOST RELEVANT SYMPTOMS OF THE REMEDY IN REPERTORIAL LANGUAGE.</li>
            <li>VERY PRECIOUS CLINICAL AND DOSAGE TIPS THAT HAVE UNPARALLELED IMPORTANCE IN PRACTICE</li>
          </ul>
          <div style={buttonWrapperStyle} className="button-wrapper mb-5">
            <button style={{ ...btnStyle, ...fillStyle }} className="btn fill">BUY NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepagevideo;
