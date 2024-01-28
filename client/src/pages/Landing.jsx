import React from 'react'
import {Link} from 'react-router-dom'
import Wrapper from '../assets/wrappers/LandingPage'
import main from "../assets/images/main.svg"
import logo from '../assets/images/logo.svg'
import "./btn.css"
import { Logo } from '../Component'
const Landing = () => {
  return (
    <Wrapper>
   <nav>
   <Logo/>
   </nav>
   <div className='container page'>
   <div className='info'>
   <h1>
   job <span>tracking</span>app
   </h1>
   <p>
   Embark on your career journ
   ey with Jobify, your gateway to limitless opportunities 
   in the heart of India! Discover a curated selection 
   of job openings tailored to your skills and aspirations. 
   From bustling metropolises to quaint towns, our platform 
   connects you with the best employers across the country. 
   Elevate your career prospects, explore new horizons, and 
   redefine success with [Your App Name]. Join us on the path 
   to professional fulfillment – where your dream job awaits!</p>
   <Link to='/register' className="btn-r-l register-link ">
   Register
   </Link>
   <Link to='/Login' className="btn-r-l ">
   Login
   </Link>
   </div>
<img src={main} alt='main' className='img main-img'/>
   </div>
    </Wrapper>
  )
}


export default Landing
