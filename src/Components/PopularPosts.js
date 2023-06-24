import React from "react";
import { Link } from "react-router-dom";
import './PopularPosts.css';

function PopularPosts({ popularPosts }) {

  return (
    <div className='popular-posts'>
      {
        popularPosts.slice(0,8).map(items=>{
          return(
            <div className="individual-popular-posts">
              <Link to={`single-post/${items.id}`}>
              <div className="popular-bio">
               <h3>
                  {items.title}
              </h3> 
              <p>
                Total Views: {items.views}
              </p>
              <p>
              <i>Posted by {items.postedBy}</i>
              </p>
              </div>
              <div className="popular-img">
                <img src={items.coverImg} alt="popular-img" />
              </div>
              </Link>
            </div>
          )
        })
      }
    </div>
  );
}

export default PopularPosts;
