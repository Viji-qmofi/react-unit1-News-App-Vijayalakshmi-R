import React, { useState, useEffect } from 'react'
import {Link} from 'react-router'
import './News.css'
import Weather from './Weather'
import Calendar from './Calendar' 
import userImg from '../assets/images/Viji_Profile.jpg'
import techImg from '../assets/images/tech.jpg'
import entertainmentImg from '../assets/images/entertainment.jpg'
import healthImg from '../assets/images/health.jpg'
import nationImg from '../assets/images/nation.jpg'
import scienceImg from '../assets/images/science.jpg'
import sportsImg from '../assets/images/sports.jpg'
import worldImg from '../assets/images/world.jpg'
import Footer from './Footer'
import Header from './Header'

const News = () => {
      const [headline, setHeadline] = useState(null);
      const [news, setNews] = useState([]);

      useEffect(() => {
            const fetchNews = async () => {
                 const url = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&apikey=fbf5f36da38f7441eb62560033d46f86`
                 const response = await fetch(url);
                  if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`)
                  }
                 const data = await response.json();
                 console.log(data); 

            }; fetchNews();
      },[]) 
      return (
    
    <div className='news'>
      
      <div className="news-content">
            <div className="navbar">
                  <div className="user">
                        <img src={userImg} alt="User Image" />
                        <p>VG's Page</p>
                  </div>
                  <nav className="categories">
                    <div className="nav-links">
                        <a href="#" className='nav-link'>Home</a>
                        <a href="#" className='nav-link'>World</a>
                        <a href="#" className='nav-link'>Business</a>
                        <a href="#" className='nav-link'>Technology</a>
                        <a href="#" className='nav-link'>Entertainment</a>
                        <a href="#" className='nav-link'>Sports</a>
                        <a href="#" className='nav-link'>Science</a>
                        <a href="#" className='nav-link'>Health</a>
                        <Link to = "/contactus">Contact Us</Link>                     
                    </div>          
                     
                  </nav>
                 
            </div>
            <div className="news-section">
                  <div className="headline">
                        <img src={techImg} alt="Headline Image" loading="lazy" />
                        <h2 className="headline-title">
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, doloribus.
                        </h2>
                  </div>
                  <div className="news-grid">
                        <div className="news-grid-item">
                              <img src={entertainmentImg} alt="News Image" loading="lazy" />
                              <h3>
                                    Lorem ipsum dolor sit amet.
                              </h3>
                        </div>

                        <div className="news-grid-item">
                              <img src={healthImg} alt="News Image" loading="lazy" />
                              <h3>
                                    Lorem ipsum dolor sit amet.
                              </h3>
                        </div> 

                        <div className="news-grid-item">
                              <img src={nationImg} alt="News Image" loading="lazy" />
                              <h3>
                                    Lorem ipsum dolor sit amet.
                              </h3>
                        </div> 

                        <div className="news-grid-item">
                              <img src={scienceImg} alt="News Image" loading="lazy" />
                              <h3>
                                    Lorem ipsum dolor sit amet.
                              </h3>
                        </div> 
                        
                        <div className="news-grid-item">
                              <img src={sportsImg} alt="News Image" loading="lazy"/>
                              <h3>
                                    Lorem ipsum dolor sit amet.
                              </h3>
                        </div> 

                        <div className="news-grid-item">
                              <img src={worldImg} alt="News Image" loading="lazy"/>
                              <h3>
                                    Lorem ipsum dolor sit amet.
                              </h3>
                        </div>      
                  </div>
            </div>
            <div className="weather-calendar">
                  <Weather />
                  <Calendar />
            </div>
              

      </div>
    <Footer />  
    </div>
      
  )
}

export default News