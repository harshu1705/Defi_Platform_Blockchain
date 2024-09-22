import React from 'react';
import './Loader.css'; // Import your SpinCubeLoader styles

const Loader = () => {
  return (
    <div className="spin-cube-loader">
      <div className="cube">
        <div className="side front"></div>
        <div className="side back"></div>
        <div className="side top"></div>
        <div className="side bottom"></div>
        <div className="side left"></div>
        <div className="side right"></div>
      </div>
    </div>
  );
};

export default Loader;
