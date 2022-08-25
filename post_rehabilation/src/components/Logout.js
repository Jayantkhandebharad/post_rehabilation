const Logout = () => {
    localStorage.removeItem("username");
    window.location.replace("/signin");
  };
  
  export default Logout;
  