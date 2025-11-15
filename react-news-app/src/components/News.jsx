import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import "./News.css";
import Modal from "./Modal";
import Weather from "./Weather";
import Calendar from "./Calendar";
import userImg from "../assets/images/Viji_Profile.jpg";
import noImg from "../assets/images/no-Img.png";
import Loader from "./Loader"

/* ----------------------------------
   CATEGORY NAMES FOR DISPLAY
---------------------------------- */
const categories = [
      "home",
      "world",
      "business",
      "technology",
      "entertainment",
      "sports",
      "science",
      "health",
      "nation"
];

/* ----------------------------------
   MAP UI NAMES --> GNEWS API NAMES
---------------------------------- */
const categoryMap = {
      home: "general",
      world: "world",
      business: "business",
      technology: "technology",
      entertainment: "entertainment",
      sports: "sports",
      science: "science",
      health: "health",
      nation: "nation"
};

const News = () => {
      const { category } = useParams(); // reads /categories/:category
      const [selectedCategory, setSelectedCategory] = useState("general");
      const [showModal, setShowModal] = useState(false);
      const [selectedArticle, setSelectedArticle] = useState(null);

      const [headline, setHeadline] = useState(null);
      const [news, setNews] = useState([]);

      const handleOpenModal = (article) => {
            setSelectedArticle(article);
            setShowModal(true);
      };

      const handleCloseModal = () => {
            setShowModal(false);
            setSelectedArticle(null);
      };


      /* ----------------------------------
         UPDATE CATEGORY WHEN URL CHANGES
      ---------------------------------- */
      useEffect(() => {
            if (category) {
                  setSelectedCategory(categoryMap[category] || "general");
            } else {
                  setSelectedCategory("general"); // homepage
            }
      }, [category]);

      /* ----------------------------------
         FETCH NEWS WHEN CATEGORY CHANGES
      ---------------------------------- */
      useEffect(() => {
            const fetchNews = async () => {
                  try {
                        const url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&country=us&apikey=fd5e0b213976ff502f9e0ef25a8c7b93`;

                        const response = await fetch(url);

                        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                        const data = await response.json();
                        const fetchedNews = data.articles || [];

                        fetchedNews.forEach((article) => {
                              if (!article.image) article.image = noImg;
                        });

                        setHeadline(fetchedNews[0] || null);
                        setNews(fetchedNews.slice(1, 7) || []);
                  } catch (error) {
                        console.error("Error fetching news:", error);

                        setHeadline({
                              title: "API Rate Limit Exceeded",
                              image: "https://via.placeholder.com/600x400?text=Rate+Limit"
                        });

                        setNews([]);
                  }
            };

            fetchNews();
      }, [selectedCategory]);

      return (
            <div className="news-content">
                  {/* ---------------- NAVBAR ---------------- */}
                  <div className="navbar">
                        <div className="user">
                              <img src={userImg} alt="User" />
                              <p>VG's Page</p>
                        </div>

                        <nav className="categories">
                              <div className="nav-links">
                                    {categories.map((cat) => (
                                          <Link
                                                key={cat}
                                                to={`/categories/${cat}`}
                                                className={`nav-link ${selectedCategory === categoryMap[cat] ? "active-category" : ""
                                                      }`}
                                          >
                                                {cat === "home" ? "Home" : cat}
                                          </Link>
                                    ))}

                                    <Link to="/contactus" className="nav-link">Contact Us</Link>
                              </div>
                        </nav>
                  </div>

                  {/* ---------------- HEADLINE ---------------- */}
                  <div className="news-section">
                        {headline ? (
                              <div className="headline" onClick={() => handleOpenModal(headline)}>
                                    <img src={headline.image || noImg} alt={headline.title} loading="lazy" />
                                    <h2 className="headline-title">{headline.title}</h2>
                              </div>
                        ) : (
                              <Loader />
                        )}

                        {/* ---------------- NEWS GRID ---------------- */}
                        <div className="news-grid">
                              {news.map((article, index) => (
                                    <div key={index} className="news-grid-item" onClick={() => handleOpenModal(article)}>
                                          <img src={article.image || noImg} alt={article.title} loading="lazy" />
                                          <h3>{article.title}</h3>
                                    </div>
                              ))}
                        </div>
                  </div>
                  <Modal show={showModal} onClose={handleCloseModal}>
                        {selectedArticle ? (
                              <>
                                    <img src={selectedArticle.image || noImg} alt={selectedArticle.title} className="modal-image" />

                                    <h2 className="modal-title">{selectedArticle.title}</h2>

                                    <p className="modal-source">
                                          Source: {selectedArticle.source?.name ?? "Unknown"}
                                    </p>

                                    <p className="modal-date">
                                          {selectedArticle.publishedAt
                                                ? new Date(selectedArticle.publishedAt).toLocaleString("en-us", {
                                                      month: "short",
                                                      day: "2-digit",
                                                      year: "numeric",
                                                      hour: "2-digit",
                                                      minute: "2-digit",
                                                })
                                                : ""}
                                    </p>

                                    <p className="modal-content-text">{selectedArticle.content ?? selectedArticle.description ?? ""}</p>

                                    <a
                                          href={selectedArticle.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="read-more-link"
                                    >
                                          Read More
                                    </a>
                              </>
                        ) : null}
                  </Modal>



                  {/* ---------------- WEATHER + CALENDAR ---------------- */}
                  <div className="weather-calendar">
                        <Weather />
                        <Calendar />
                  </div>
            </div>
      );
};

export default News;
