// import React, { useState } from 'react';
// import '../style/Carousel.css';

// const Carousel = ({ images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
//   };

//   return (
//     <div className="carousel">
//       <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
//         {images.map((image, index) => (
//           <img key={index} src={image} alt={`Image ${index + 1}`} />
//         ))}
//       </div>
//       <button className="carousel-btn prev" onClick={prevSlide}>‹</button>
//       <button className="carousel-btn next" onClick={nextSlide}>›</button>
//     </div>
//   );
// };

// export default Carousel;
