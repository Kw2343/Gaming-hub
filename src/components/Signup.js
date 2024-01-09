import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FooterInfoBox from './FooterInfoBox';
import { useUserAuth } from "../context/UserAuthContext";
import Header from './Header';
import './Signup.css';

export const Signup = () => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("user"); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState(null); // New state for Date of Birth

    const signUp = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userCollectionRef = collection(db, 'users');
        await addDoc(userCollectionRef, {
          uid: user.uid,
          name: name,
          role: role,
          email: email,
          dob: dob, 
        });
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    };

    return (
        <div className='background2'>
        <Header />
        <div className="signup-container">
        <div className="signup-form">
          <h2 className='title'>Create a new account</h2>
          <input placeholder="Name.." onChange={(e) => setName(e.target.value)} />
          <input placeholder="Email.." onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Password.." type="password" onChange={(e) => setPassword(e.target.value)} />
          <DatePicker
            selected={dob}
            onChange={(date) => setDob(date)}
            placeholderText="Date of Birth"
            calendarClassName="custom-datepicker"
            
          />
          <select onChange={(e) => setRole(e.target.value)} value={role}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={signUp} className="button">Sign Up</button>
          <p>Have an Account? <Link to="/login">Login</Link></p>
        </div>
      </div>
      <FooterInfoBox />
      </div>
    );
};

export default Signup;
