import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;

    if (!apiKey) {
      setError("API key is missing. Please check your .env file.");
      return;
    }

    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data.articles || []);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to fetch news data.");
      });
  }, []);

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>

      {error && <p className="text-center text-danger">{error}</p>}

      <div className="d-flex flex-wrap justify-content-center gap-3">
        {(articles || []).map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsBoard;
