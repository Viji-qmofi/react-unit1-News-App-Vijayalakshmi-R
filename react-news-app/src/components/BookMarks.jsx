// BookMarks.jsx
import React from "react";
import Modal from "./Modal";
import noImg from "../assets/images/no-Img.png";
import "./Bookmarks.css";

const BookMarks = ({ show, bookmarks, onClose }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="bookmarks-heading">Bookmarked News</h2>

      <div className="bookmarks-list">
        {bookmarks.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bookmark-item"
          >
            <img src={article.image || noImg} alt={article.title} />
            <h3>{article.title}</h3>
          </a>
        ))}
      </div>
    </Modal>
  );
};

export default BookMarks;
