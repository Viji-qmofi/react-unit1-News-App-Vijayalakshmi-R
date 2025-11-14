import React, {usestate, useEffect, useState} from 'react'
import { Link } from 'react-router'
import './News.css'
import Weather from './Weather'
import Calendar from './Calendar'
import userImg from '../assets/images/Viji_Profile.jpg'
import noImg from '../assets/images/no-Img.png'

const categories = [
     'home',
     'world',
     'business',
     'technology',
     'entertainment',
     'sports',
     'science',
     'health' 
]

const News = () => {
      const [headline, setHeadline] = useState(null);
      const [news, setNews] = useState([]);
      const [selectedCategory, setSelectedCategory] = useState('general')

 useEffect(() => {
  const fetchNews = async () => {
    try {
      const url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=e594a198a130f391ac23bccfbced3fa8`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const fetchedNews = data.articles;

      fetchedNews.forEach((article) => {
            if(!article.image) {
                  article.image = noImg
            }
      })

      setHeadline(fetchedNews[0]);
      setNews(fetchedNews.slice(1, 7));
      {/*console.log(fetchedNews.slice(1, 7));*/}
    } catch (error) {
      console.error("Error fetching news:", error);/*Error 439 */
      setHeadline({ 
        title: "API Rate Limit Exceeded",
        image: "https://via.placeholder.com/600x400?text=Rate+Limit" 
      });
      setNews([]);
    }
  };

  fetchNews();
}, [selectedCategory]);

const handleCategoryClick = (e, category) => {
      e.preventDefault();
      setSelectedCategory(category);
}
      
      return (
            <div className="news-content">
                  <div className="navbar">
                        <div className="user">
                              <img src={userImg} alt="User Image" />
                              <p>VG's Page</p>
                        </div>
                        <nav className="categories">
                              <div className="nav-links">
                                    {categories.map((category) => (
                                          <a
                                          href='#'
                                          key={category}
                                          className='nav-link'
                                          onClick={(e) => handleCategoryClick(e, category)}
                                          >
                                          {category}      
                                          </a>
                                    ))}
                                    
                                    <Link to="/contactus">Contact Us</Link>
                              </div>

                        </nav>

                  </div>
                  <div className="news-section">
                        {headline ? (
                        <div className="headline">
                              <img src={headline.image || noImg} alt={headline.title} loading="lazy" />
                              <h2 className="headline-title">{headline.title}</h2>
                        </div>
                  ) : (
                        <p>Loading...</p>
                  )}

                        <div className="news-grid">
                              {news.map((article,index) => (
                                    <div key={index} className="news-grid-item">
                                    <img src={article.image || noImg} alt={article.title} loading="lazy" />
                                    <h3>
                                          {article.title}
                                    </h3>
                              </div>
                              ))}
                              

                              
                        </div>
                  </div>
                  <div className="weather-calendar">
                        <Weather />
                        <Calendar />
                  </div>


            </div>

      )
}

export default News