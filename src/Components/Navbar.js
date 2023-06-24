import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import useAdmin from '../context/useAdmin';
function Navbar() {
    const {user,dispatch} = useAppContext();
    const [admin,setAdmin] = useState(false)
    const {getAdmin} = useAdmin();
    const handleLogout = () => {
        dispatch({type:"LOGOUT"})
    }
    const handleAdmin = async () =>{
        if(user){
            setAdmin(await getAdmin(user))
        }
    }
    useEffect(()=>{
        handleAdmin();
    },[user])
  return (
    <div className='navbar-container'>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About Me</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
                <li>
                    {
                        user?admin?<Link to="/create-post">Create Post</Link>:<Link onClick={handleLogout}>Logout</Link>:<Link to="/register">Login/Register</Link>
                     
                    }
                </li>
            </ul>
    </div>
  )
}

export default Navbar