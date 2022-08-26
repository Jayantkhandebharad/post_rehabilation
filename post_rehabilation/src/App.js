import React, { useEffect, useState } from "react";
import { BrowserRouter , Route, Routes, Navigate,useNavigate} from "react-router-dom";
import Footer from "./components/Footer";
import Logout from "./components/Logout";
// import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Signin from "./components/Signin";
import AddPatient from "./components/AddPatient";
import ListOfPatients from "./components/ListOfPatients";
import UserDetails from "./components/UserDetails";
import Complaints from "./components/Complaints";

import Avt from "./components/AVT/Avt";
import User_details_avt from "./components/AVT/User_details_avt";
import ListOfUsers_avt_scheduled from "./components/AVT/Avt_scheduled";
import User_details_avt_scheduled from "./components/AVT/User_details_avt_scheduled";

import Zc from "./components/ZC/Zc";
import UserDetails_zc from "./components/ZC/UserDetails_zc";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  let user = localStorage.getItem("username");
  let role = localStorage.getItem("role");

  const isLoggedIn = () => {
    if (user) {
      setLoggedIn(true);
    }
  };

  React.useEffect(() => {
    if (isLoggedIn()) {
      setLoggedIn(true);
    }
  }, []);

  let pages = ["logout"];

  if (loggedIn && role == 1) {
    return (
      <>        
          <Routes>
            <Route exact path="/doctor" element={<ListOfPatients />}></Route> 
            <Route exact path="/addPatient" element={<AddPatient />}></Route> 
            <Route exact path="/listOfPatients" element={<ListOfPatients />}></Route>  
            <Route exact path="/userDetails/:id" element={<UserDetails />} /> 
            <Route exact path="/complaints" element={<Complaints />} /> 
            <Route exact path="/Logout" element={<Logout />} /> 
          </Routes>   
          <Footer />
        </>
    );
  } 
  else if(loggedIn && role == 2){
    return (
      <>        
          <Routes>
            <Route exact path="/avt" element={<Avt/>}></Route>
            <Route exact path="/user_details_avt/:id" element={<User_details_avt/>}/> 
            <Route exact path="/avt_scheduled" element={<ListOfUsers_avt_scheduled/>}></Route>
            <Route exact path="/user_details_avt_scheduled/:id" element={<User_details_avt_scheduled/>}></Route>
            <Route exact path="/Logout" element={<Logout />} /> 
          </Routes>   
          <Footer />
        </>
    );
  }
  else if(loggedIn && role == 3){
    return (
      <>        
          <Routes>
            <Route exact path="/zc" element={<Zc />}></Route> 
            <Route exact path="/userDetails_zc/:id" element={<UserDetails_zc/>}></Route> 
            <Route exact path="/Logout" element={<Logout />} /> 
          </Routes>   
          <Footer />
        </>
    );
  }
  else {
    return (
      <>
        <Routes>
          <Route exact path="/signin" element={<Signin />}></Route>
        </Routes>
        </>
    );
  }
}

export default App;
