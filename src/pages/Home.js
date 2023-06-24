import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import PopularPosts from "../Components/PopularPosts";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import "./Home.css";
import bannerImg from '../img/Programming-amico.png';
import me from '../img/me.jpg';
import Pagination from "../Components/Pagination";
import { useAppContext } from "../context/AppContext";

function Home() {
  const [posts, setPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const postCollectionRef = collection(db, "posts");
  const {dispatch} = useAppContext();
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      
      setPosts(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
      const popPost = data.docs
        .map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
        .sort((a, b) => {
          return b.views - a.views;
        });

      dispatch({type:"PAGE",payload:'/'})
      setPopularPosts(popPost);
    };
    getPosts();
  }, []);

  const startIndex = (currentPage-1)*itemsPerPage;
  const endIndex = startIndex+itemsPerPage;
  const currentItems = posts.slice(startIndex,endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  return (
   <div className="home-container">
    <div className="banner">
        <div className="bio-banner">
          <h1>Hello, I'm <span>Sagar</span></h1>
          <h2>Welcome to my blog.</h2>
          <h3>Don't miss out on the latest news about Travel Stories, Tech review, Food guide...</h3>
          <div className="newsletter">
            <input type="text" placeholder="enter your email"/>
            <button>Subscribe</button>
          </div>
        </div>
        <div className="banner-img">
          <img src={bannerImg} alt="banner-img" />
        </div>
    </div>

    <div className="feature-post">
      <div className="section-one">
          <div className="heading">
            <h3>All Posts</h3>
          </div>
          <div className="post-content">
            {
              
              posts.length>0 ? posts.length < 9?posts.map(items=>{
                return(
                  <div className="individual-posts">
                  <div className="post-img">
                      <Link to={`single-post/${items.id}`}>
                        <img src={items.coverImg} alt="post" />  
                      </Link>                       
                  </div>
                  <div className="post-bio">
                    {
                      items.lables.length > 0 && <div className="category">
                        {
                          items.lables.map(item=><p>{item}</p>)
                        }
                      </div>
                    }
                    <Link to={`single-post/${items.id}`}>
                      <h3>{items.title}</h3>
                    </Link>
                    <div className="post-footer">
                      <p>Posted at: {items.createdAt}</p>
                      <i>Posted by {items.postedBy}</i>
                    </div>
                  </div>
                </div>
                );
              }) : <div className="pagination">
                {
                  currentItems.map(items=>{
                    return(
                      <div className="individual-posts">
                      <div className="post-img">
                          <Link to={`single-post/${items.id}`}>
                            <img src={items.coverImg} alt="post" />  
                          </Link>                       
                      </div>
                      <div className="post-bio">
                        {
                          items.lables.length > 0 && <div className="category">
                            {
                              items.lables.map(item=><p>{item}</p>)
                            }
                          </div>
                        }
                        <Link to={`single-post/${items.id}`}>
                          <h3>{items.title}</h3>
                        </Link>
                        <div className="post-footer">
                      <p>Posted at: {items.createdAt}</p>
                      <i>Posted by {items.postedBy}</i>
                    </div>
                      </div>
                    </div>
                    );
                  }) 
                }
                <Pagination data={posts} itemsPerPage={itemsPerPage} handlePageChange={handlePageChange}/>
              </div>:<Loading />
            }
          </div>
      </div>
      <div className="section-two">
          <div className="about-me-section">
              <div className="about-me-img">
                <img src={me} alt="me" />
              </div>
              <div className="about-me-bio">
                <h2>Hello, I'm Sagar</h2>
                <p>Hi, I'm Sagar, I am a passionate web developer proficient in HTML5, CSS3, JavaScript, React JS, and Python. I am a nomadic traveler who enjoys exploring every corner of the world. Writing is my passion. With an engineering degree in computer science, I love applying my skills to solve everyday problems.</p>
              </div>
          </div>
          <div className="pop-section">
          <div className="heading">
            <h3>Popular Posts</h3>
          </div>
          <PopularPosts popularPosts={popularPosts} handlePageChange={handlePageChange}/>
          </div>
          
      </div>
    </div>
   </div>
  );
}

export default Home;
