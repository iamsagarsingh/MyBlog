import React from 'react'
import './App.css'
import Header from './Components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import SinglePosts from './pages/SinglePosts';
import Footer from './Components/Footer';
function App() {
  return (
    <div>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/contact' element={<Contact />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/create-post' element={<CreatePost />}/>
            <Route path='/single-post/:id' element={<SinglePosts />} />
          </Routes>
          <Footer />
        </Router>
    </div>
  )
}

export default App