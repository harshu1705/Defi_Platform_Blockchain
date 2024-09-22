import React from 'react';
// import './BlockchainCarousel.css';
import video from '../images/vid.mp4'

const BlockchainSection = () => {

  return (
    <section className='w-full'>
      <div className=' w-full flex-center flex-col' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: '10', color: '#fff' }}>
        <h2 style={{color:"green", fontSize: '80px' }}>Welcome to BlockFusion</h2>
        <p style={{color:'white', fontSize: '30px' }}>
          Explore the world of DEFI blockchain and its innovative solutions.
        </p>
      </div>
      <div className='vid' style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <video src={video} autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover',opacity: '0.9' }}/>
      </div>
    </section>
  );
};

export default BlockchainSection;