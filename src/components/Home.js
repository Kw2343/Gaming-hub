import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './Home.css';
import PhotoSlider from './PhotoSlider';
import FooterInfoBox from './FooterInfoBox';
import Header from './Header';
import Introduction from './Introduction';
import Topbar from './Topbar';


function Home() {
 
  
  return (
    <div className="background-gradient">
    <Topbar />
    <Header />
    <Introduction />
      <div className='photoslider'><PhotoSlider /></div>
      <FooterInfoBox />
    </div>
  );
}

export default Home;
