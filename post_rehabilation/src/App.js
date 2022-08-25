import React, { useEffect, useState } from "react";
import { BrowserRouter , Route, Routes, Navigate,useNavigate} from "react-router-dom";
import Footer from "./components/Footer";
import Logout from "./components/Logout";
// import ResponsiveAppBar from "./components/ResponsiveAppBar";
// import Signin from "./components/Signin";
// import AddPatient from "./components/AddPatient";


function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);

  const isLoggedIn = () => {
    let user = localStorage.getItem("username");
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

  if (loggedIn) {
    return (
      <>        
         {/* <ResponsiveAppBar pages={pages} /> */}
          <Routes>
            {/* <Route exact path="/addPatient" element={<Home />}></Route>    */}
          </Routes>   
          <Footer />
        </>
    );
  } else {
    pages = ["signin"];
    return (
      <>
        {/* <ResponsiveAppBar pages={pages} hideDrawer={true} /> */}
        <Routes>
          {/* <Route exact path="/signin" element={<Signin />}></Route> */}
        </Routes>
        <Footer />
        </>
    );
  }
}

export default App;
