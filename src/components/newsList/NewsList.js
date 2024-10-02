import React from 'react';
import './NewsList.css';

function NewsList({ articles }) {
  return (
    <div className="news-list">
      {articles.map((article, index) => (
        <div key={index} className="news-item">
          <img src={article.image} alt={article.title} />
          <div className="news-content">
            <h3>{article.title}</h3>
            <p>{article.summary}</p>
            <p><small>{article.date} - {article.author}</small></p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsList;
