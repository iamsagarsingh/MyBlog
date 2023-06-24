import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { db, storage } from '../firebase-config';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import { v4 } from 'uuid';
import { collection,addDoc,doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import useAdmin from '../context/useAdmin';


const  modules  = {
  toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script:  "sub" }, { script:  "super" }],
      ["blockquote", "code-block"],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
  ],
};
function CreatePost() {
  const [data,setData] = useState({title:"",label:'',labelSet:[]})
  const [image,setImage] = useState(null);
  const {getAdmin} = useAdmin();
  const [content,setContent] = useState('');
  const postCollectionRef = collection(db,'posts')
  const {user} = useAppContext();
  const navigate = useNavigate()
  
  const handleAdmin = async () =>{
    const tempAdmin = await getAdmin(user)
    if(!tempAdmin){
      navigate('/')
    }
  }
  useEffect(()=>{
    handleAdmin()
    localStorage.setItem('editor-text',JSON.stringify({data,content}))

  },[])

  const handleInput = (e) => {
    setData({
      ...data,[e.target.name]:e.target.value,labelSet:data.label.split(',')
    })

  }
  const handleImagChange = (e) => {
    setImage(e.target.files[0])
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const storageRef = ref(storage,`images/${image.name + v4()}`);
      await uploadBytes(storageRef,image);
      const url = await getDownloadURL(storageRef);

      const currentDate = new Date();
      const options = {day:'numeric',month:'short',year:'numeric'}
      const formattedDate = currentDate.toLocaleDateString('en-US',options)
     
      await addDoc(postCollectionRef,{title:data.title,lables:data.labelSet,content,coverImg:url,views:0,comments:[],createdAt:formattedDate,postedBy:user.user.displayName})
      navigate('/')
    }
    catch(err){
      alert(err.message)
    }
    

  }
  return (
    <div className='editor-container'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="image">Select cover image:</label>
        <input type="file" accept='image/*' onChange={handleImagChange}/>
        <label htmlFor="title">Title:</label>
        <input type="text" value={data.title} name='title' onChange={handleInput}/>
        <ReactQuill modules={modules} theme="snow" value={content} onChange={setContent} />
        <label htmlFor="label">Label:</label>
        <textarea cols="3" rows="2" name="label" value={data.label} onChange={handleInput} placeholder='enter , separated values like: travel,food,entertainment'></textarea>
        <div className='labelArea'>
            {
              data.labelSet.map(item=>{
                return <button className='labelButton'>{item}</button>
              })
            }
        </div>
        <input type="submit" />
      </form>
      
    </div>
  )
}

export default CreatePost