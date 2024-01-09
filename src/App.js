import Home from './components/Home';
import Admin from './components/Admin'
import React, { useEffect, useState } from "react";
import { Auth } from './components/Auth';
import {db} from "./config/firebase";
import {getDocs, collection} from 'firebase/firestore';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserAuthContextProvider , useUserAuth} from "./context/UserAuthContext";
import Signup from './components/Signup'
import Login from './components/Login';
import AboutUs from './components/Aboutus';



const ProtectedRoute = ({ children, authorized }) => {
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);
  if (!user || !authorized) {
    return <Navigate to="/login" />;
  }
  return children;
};


function App() {

  class Connection extends React.Component {
    componentDidMount() {
      const apiUrl = 'http://127.0.0.1:8000/api/';
      fetch(apiUrl)
          .then((response)=> response.json())
          .then((data) => console.log(data));
    }
  
    render(){
      return <div>connection</div>
    }
  }

  const [roomList, setRoomList] = useState([]); 
  useEffect(() => {
    const roomCollectionRef = collection(db, "Hotel rooms");

    const fetchRoomData = async () => {
      try {
        const data = await getDocs(roomCollectionRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setRoomList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRoomData();
  }, []);

  return (
  <UserAuthContextProvider>
  <div className="App" >
  <BrowserRouter>
  <Routes>
  <Route exact path='/' element={<Home />}/>
  <Route path='/auth' element={<Auth />}/> 
  <Route path='/Signup' element={<Signup />}/> 
  <Route path='/login' element={<Login />}/> 
  <Route path='/aboutus' element={<AboutUs />}/> 
  <Route path='/admin' element={<Admin />}/> 


  


 

  


 


  </Routes>
  </BrowserRouter>
  </div>
  </UserAuthContextProvider>

  );
 }

 export default App;
 