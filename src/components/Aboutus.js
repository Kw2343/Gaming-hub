import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import FooterInfoBox from "./FooterInfoBox";
import "./Aboutus.css";
import Header from "./Header";

function AboutUs() {

  return (
    <div>
      <Header />
    <div className="about-us">
      <h1>About Our Company</h1>
      <p>
        Welcome to Gaming HUb! We are a passionate team dedicated to providing high-quality products/services to our customers.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is to enhance the well-being of our customers by delivering innovative and sustainable solutions. We strive to make a positive impact on the world through our products and services.
      </p>

      <h2>Our Team</h2>
      <p>
        Meet our team of experts who work diligently to make our vision a reality. We have a diverse and talented group of individuals.
      </p>
      <div className="team-grid">
  
      </div>
    
      <h2>Contact Us</h2>
      <p>
        If you have any questions or would like to get in touch with us, please feel free to contact us at <a href="mailto:contact@kw.com" className="email">contact@kw.com</a>
      </p>
      </div>
      <FooterInfoBox />
     
      
    </div>
    

  );
}

export default AboutUs;
