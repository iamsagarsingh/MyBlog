import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../firebase-config';
import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
import { db } from '../firebase-config';
import { collection,addDoc} from 'firebase/firestore';
import { useAppContext } from '../context/AppContext';
function Register() {
    const [data,setData] = useState({name:'',email:'',password:''});
    const auth = getAuth(app)
    const userCollectionRef = collection(db,'users');
    const navigate = useNavigate()
    const {dispatch} = useAppContext()
    const handleInput = (e) => {
        setData(
            {...data,[e.target.name]:e.target.value}
        )
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
                const response = await createUserWithEmailAndPassword(auth,data.email,data.password)
                await updateProfile(auth.currentUser,{displayName:data.name})
                await addDoc(userCollectionRef,{uid:response.user.uid,name:response.user.displayName,isAdmin:false})
                dispatch({type:"REGISTER",payload:response.user,isAdmin:false})
                navigate('/')
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
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <input type="text" name="name" value={data.name} onChange={handleInput} />
                        <label>Email:</label>
                        <input type="text" name="email" value={data.email} onChange={handleInput} />
                        <label>Password:</label>
                        <input type="password" name="password" value={data.password} onChange={handleInput} />
                        <input type="submit" />
                    </form>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
        </div>
    </div>
  )
}

export default Register