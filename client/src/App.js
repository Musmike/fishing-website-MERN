import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Post from './components/Post';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Reviews from './components/Reviews';
import About from './components/About';
import Contact from './components/Contact'; 
import Profile from './components/Profile'; 
import Footer from './components/Footer';
import './App.css';

function App() {
    const location = useLocation();

    useEffect(() => {
        const pageTitle = getPageTitle(location.pathname);
        document.title = pageTitle;
    }, [location]);

    const getPageTitle = (path) => {
        switch (path) {
            case '/post':
                return 'Post';
            case '/reviews':
                return 'Opinie';
            case '/about':
                return 'O nas';
            case '/contact':
                return 'Kontakt';
            case '/profile':
                return 'Profil';
            case '/register':
                return 'Rejestracja';
            case '/login':
                return 'Logowanie';
            default:
                return 'Wędkarstwo naszą pasją';
        }
    };

    return (
        <div className="app-container">
            <Navbar />
            <div className="content-container">
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/home" exact element={<Home />} />
                    <Route path="/post/:postId" element={<Post />} /> 
                    <Route path="/reviews" exact element={<Reviews />} />
                    <Route path="/about" exact element={<About />} />
                    <Route path="/contact" exact element={<Contact />} />
                    <Route path="/profile" exact element={<Profile />} />
                    <Route path="/register" exact element={<Register />} />
                    <Route path="/login" exact element={<Login />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
