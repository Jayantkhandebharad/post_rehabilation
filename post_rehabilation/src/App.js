import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter , Route, Routes, Navigate,useNavigate} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </div>
  );
}

export default App;
