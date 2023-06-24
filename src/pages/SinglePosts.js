import {doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../firebase-config';
import parse from 'html-react-parser'
import { useAppContext } from '../context/AppContext';
function SinglePosts() {
  const [comment,setComment] = useState('');
  const {id} = useParams();
  const [post,setPost] = useState({})
  const {user,dispatch} = useAppContext();
  const [allComments,setAllComments] = useState([]);
  const postCollectionRef = doc(db,'posts',id)
 
  useEffect(()=>{
    const getPost = async () => {
        const data = await getDoc(postCollectionRef)
        setPost(data.data())
        setAllComments(data.data().comments)
        await updateDoc(postCollectionRef,{views:data.data().views+1})
    }

    dispatch({type:"PAGE",payload:`/single-post/${id}`})
    getPost()

    window.scrollTo(0, 0)
  }
  ,[])

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(comment !== ''){
      const data = [...allComments,{username:user.user.displayName,comment:comment}]
      setAllComments(data);
      await updateDoc(postCollectionRef,{comments:data})
    }
    
    setComment('')
  }
  return (
    <div className='single-post-container'>
     
      <div className="banner">
        {post && <img src={post.coverImg} alt="cover"/>}
      </div>

      <div className='headings'>
          {post && <h1>{post.title}</h1>}
      </div>

      <div className="paragraph">
          {post.content && <p>{parse(post.content)}</p>}
      </div>
      <div className="comments-section">
        <div className="heading">
            <h3>Add Comments</h3>
        </div>
        {user ? 
        <div className='comment-box'>  
          <form onSubmit={handleSubmit}>
            <textarea  
            placeholder='enter your comment here...'
            rows="4" onChange={(e)=>{return setComment(e.target.value)}} value={comment}></textarea>
            <input type="submit" value="Comment Now" />
          </form>
        </div>:
          <div className='not-logged-in'>
            <p><Link to='/login'>Login</Link> to comment.</p>
          </div>
        }
        <div className="display-comments">
            <div className="heading">
              <h3>All Comments</h3>
            </div>
            
            {
             allComments.length > 0 && 
              allComments.map((item,idx)=>{
                return(<div key={idx} className='user-comments'>
                  <i className="fa-solid fa-user"></i>
                  <h3>{item.username}:</h3>
                  <p>{item.comment}</p>
                  </div>)
              })
            }
          
        </div>
      </div>
    </div>
  )
}

export default SinglePosts