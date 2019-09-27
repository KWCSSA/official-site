import React from 'react';

export default props => {
  return (
    <div style={{position: "fixed", height: "100vh", width: "100vw", backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: "100", top: "0", left: "0"}} className={props.show ? 'd-flex justify-content-center align-items-center' : 'd-none'} onClick={() => props.toggle()}>
      <img style={{height: "100%"}} src={props.src} alt="Modal" />
    </div>
  );
};