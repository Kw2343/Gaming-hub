import React from 'react';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './Introduction.css';


function Introduction() {
  return (
    <div className="background">

      <div className="intro-content">
        <h1>Welcome to GamingHub: Your Ultimate Gaming Destination!</h1>
        <p>
          Ready to elevate your gaming experience? Look no further! At GamingHub, we've created a gaming paradise tailored just for you. Whether you're a casual gamer or a hardcore enthusiast, our platform offers a diverse range of features and content to immerse you in the world of gaming like never before.
        </p>

        <h2>Why Choose GamingHub?</h2>
        <ol>
          <li>
            <strong>Extensive Game Library:</strong> Explore a vast collection of games across genres, from action-packed shooters to immersive role-playing adventures.
          </li>
          <li>
            <strong>Social Gaming Community:</strong> Connect with fellow gamers, join clans, and make new friends who share your passion.
          </li>
          <li>
            <strong>Exclusive Rewards and Tournaments:</strong> Gain access to exclusive in-game rewards, participate in thrilling tournaments, and showcase your skills to the world.
          </li>
          <li>
            <strong>Seamless Cross-Platform Play:</strong> No matter your preferred gaming device, enjoy seamless cross-platform play.
          </li>
        </ol>

        <h2>How It Works:</h2>
        <ol>
          <li>
            <strong>Sign Up:</strong> Creating your GamingHub account is quick and easy. Simply sign up, choose your gaming preferences, and start your journey.
          </li>
          <li>
            <strong>Explore Games:</strong> Dive into our extensive game library and discover titles curated just for you.
          </li>
          <li>
            <strong>Connect and Play:</strong> Join the gaming community, connect with friends, and start playing.
          </li>
          <li>
            <strong>Earn Rewards:</strong> Level up your gaming profile, participate in tournaments, and earn exclusive rewards.
          </li>
        </ol>

        <p>
          <strong>Join Us Today!</strong> Embark on a gaming adventure like never before. Join GamingHub today and let the games begin! Your epic journey awaits.
        </p>

        <div className="cta-button">
          <Link to="/signup">🚀 Start Gaming Now!</Link>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
