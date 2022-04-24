import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home'
import UploadProfile from './components/pages/UploadProfile';
import HowToUse from './components/pages/HowToUsePage';

function App() {

    return (
        <>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path='/' exact element={<Home/>}/>
                    <Route path='/upload-profile' exact element={<UploadProfile/>}/>
                    <Route path='/how-to-use' exact element={<HowToUse/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
