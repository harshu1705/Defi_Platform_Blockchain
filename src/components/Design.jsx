import React from 'react';
import Carousel from '../components/Carousel.jsx';
import metamask from '../images/metamask.png';
import truffle from '../images/truffle_logo_light.svg';
import kava from '../images/Kava.png';


const Design = () => {
  const images = [metamask, truffle, kava];
  const classes = useStyles();
  return (
    <main>
      <Carousel images={images} />

      
    </main>
  );
};

export default Design;
