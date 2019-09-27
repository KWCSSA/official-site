import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div style={{height: '70vh', backgroundColor: '#fafafa', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className="d-none d-md-flex flex-column">
        <div style={{fontSize: '10vw', textAlign: 'center', lineHeight: '1'}}>404</div>
        <div style={{fontSize: '4vw', textAlign: 'center'}}>PAGE NOT FOUND</div>
        <div style={{fontSize: '1.3vw', textAlign: 'center', marginTop: '1vh'}}>We looked everywhere for this page.</div>
        <div style={{fontSize: '1.3vw', textAlign: 'center', marginTop: '1vh'}}>Are you sure the website URL is correct?</div>
        <div className="d-flex justify-content-center mt-4"><Link to='/' className="btn btn-dark btn-lg w-50" onClick={() => {window.scrollTo(0, 0)}}>Go Back Home</Link></div>
      </div>
      <div className="d-flex d-md-none flex-column">
        <div style={{fontSize: '30vw', textAlign: 'center'}}>404</div>
        <div style={{fontSize: '10vw', textAlign: 'center', marginTop: '-4vh'}}>PAGE NOT FOUND</div>
        <div style={{fontSize: '3.5vw', textAlign: 'center', marginTop: '1vh'}}>We looked everywhere for this page.</div>
        <div style={{fontSize: '3.5vw', textAlign: 'center', marginTop: '1vh'}}>Are you sure the website URL is correct?</div>
        <div className="d-flex justify-content-center mt-4"><Link to='/' className="btn btn-dark btn-lg w-75" onClick={() => {window.scrollTo(0, 0)}}>Go Back Home</Link></div>
      </div>
    </div>
  );
};