import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../firebase-config';
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth';
import { useAppContext } from '../context/AppContext';
function Login() {
    const [data,setData] = useState({email:'',password:''});
    const auth = getAuth(app)
    const navigate = useNavigate()
    const {dispatch,cPage} =  useAppContext()
    const handleInput = (e) => {
        setData(
            {...data,[e.target.name]:e.target.value}
        )
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response = await signInWithEmailAndPassword(auth,data.email,data.password);
            dispatch({type:"LOGIN",payload:response})
            navigate(`${cPage}`)
        }
        catch(err){
            alert(err.message)
        } 
    }
  return (
    <div className="user-component">
        <div className='register-box'>
            <div className='left-side'>
                    <img src="https://images.unsplash.com/photo-1489743342057-3448cc7c3bb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2VsY29tZSUyMHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="welcome" />
            </div>

                <div className="right-side">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Email:</label>
                        <input type="text" name="email" value={data.email} onChange={handleInput} />
                        <label>Password:</label>
                        <input type="password" name="password" value={data.password} onChange={handleInput} />
                        <input type="submit" />
                    </form>
                    <p> New User? <Link to="/register">Register</Link></p>
                </div>
        </div>
    </div>
  )
}

export default Login