import React from 'react'
import "./About.css";
import me from '../img/me.jpg';
function About() {
  return (
    <div className='about-container'>
        <div className="about-section">
          <div className="my-pic">
            <img src={me} alt="myself" />
          </div>
          <div className="bio">
              <span>Hello Everybody, I am</span>
              <h1>Sagar Singh</h1>
              <h3>Web Developer</h3>
              <p>I am  a passionate web developer with expertise in HTML, CSS, JavaScript, and React JS. I also have a strong foundation in Python programming. I have a keen eye for design and a knack for creating visually appealing and user-friendly websites.</p>
              <p className='icons'><i class="fa-solid fa-calendar"></i>03rd October, 1999</p>
              <p className='icons'><i class="fa-solid fa-phone"></i>9664001891</p>
              <p className='icons'><i class="fa-solid fa-envelope"></i>sagar100rawat@gmail.com</p>
              <p className='icons'><i class="fa-solid fa-house"></i>India</p>
          </div>
        </div>
    </div>
  )
}

export default About