import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home'
import Footer from './components/Footer';
import UploadProfile from './components/pages/UploadProfile';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/Upload-Profile' exact element={<UploadProfile />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
