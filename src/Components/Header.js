import React, { useEffect, useState } from 'react';
import "./Header.css";
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import useAdmin from '../context/useAdmin';
function Header() {
    const [showNavbar,setShowNavbar] = useState(false)
    const [admin,setAdmin] = useState(false);
    const {user,dispatch} = useAppContext()
    const {getAdmin} = useAdmin()
    const toggleNavbar = () =>{
        setShowNavbar(!showNavbar)
    }
    const handleLogout = () => {
        dispatch({type:'LOGOUT'})
    }
    const handleAdmin = async () => {
        if(user){
            const tempAdmin = await getAdmin(user)
            setAdmin(tempAdmin)
        }
    }
    useEffect(()=>{
        if(showNavbar){
            document.body.style.backgroundColor = '#F0F0F0';
        }
        else{
            document.body.style.backgroundColor = '#fff'
        }
        handleAdmin();
    },[showNavbar])
  return (
    <div>
    <div className='header-content'>
        <div className="social-links">
            <a href="https://www.facebook.com/profile.php?id=100006713462775" target='_blank'><i className="fa-brands fa-facebook"></i></a>
            <a href="https://www.instagram.com/__sagar.rawat__/" target='_blank'><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.youtube.com/@iamsagarsingh" target='_blank'><i className="fa-brands fa-youtube"></i></a>
        </div>
        <div className="blog-title">
            <h2>Sagar's Blog</h2>
        </div>
        <div className="menu-search">
            <i className="fa-solid fa-bars" onClick={toggleNavbar}></i>
            <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className={`toggle-navbar ${showNavbar ? "active":""}`}>
            <ul>
                <li onClick={toggleNavbar}>
                <i className="fa-solid fa-xmark"></i>
                </li>
                <li className='user-navbar'>
                <i className="fa-regular fa-user"></i>
                <p>Hello,<span> {user?user.user.displayName:"Guest"}</span></p>
                </li>
                <li onClick={toggleNavbar}>
                    <Link to="/">Home</Link>
                </li>
                <li onClick={toggleNavbar}>
                    <Link to="/about">About us</Link>
                </li>
                <li onClick={toggleNavbar}>
                    <Link to="/contact">Contact us</Link>
                </li>
                
                    {
                        user?admin?<ul className='dynamic-links' style={{marginTop:"0px"}}><li onClick={toggleNavbar}><Link to="/create-post">Create Post</Link></li>
                        <li onClick={toggleNavbar}><Link onClick={handleLogout}>Logout</Link></li>
                        </ul>:<li onClick={toggleNavbar}><Link onClick={handleLogout}>Logout</Link></li>:<li onClick={toggleNavbar}><Link to="/register">Login/Register</Link></li>
                    }
                    
                
            </ul>
        </div>
    </div>
        <Navbar />
    </div>
  )
}

export default Header