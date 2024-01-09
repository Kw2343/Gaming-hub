import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './PhotoSlider.css';
import Image1 from '../assets/board.jpg';
import Image2 from '../assets/video.jpg';
import Image3 from '../assets/word.jpg';


const PhotoSlider = () => {
  return (
    
    <div className="photo-slider-container"> 
      <Carousel autoPlay infiniteLoop showThumbs={false} interval={3000}>
        <div>
          <img src={Image1} alt="Image 1" />
          <p className="legend">Board</p>
        </div>
        <div>
          <img src={Image2} alt="Image 2" />
          <p className="legend">Car Race</p>
        </div>
        <div>
          <img src={Image3} alt="Image 3" />
          <p className="legend">Word game </p>
        </div>
    
      </Carousel>
    </div>
    
  );
};

export default PhotoSlider;
