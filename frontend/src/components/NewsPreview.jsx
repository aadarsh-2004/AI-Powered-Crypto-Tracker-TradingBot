import React, { useEffect, useState } from "react";
import { fetchCryptoNews } from "../../API/newsAPI";

const NewsPreview = ({ onNewsClick }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const data = await fetchCryptoNews();
      setNews(data.slice(0, 5)); // Show only the first 5 articles in the preview
    };
    loadNews();
  }, []);

  return (
    <div className="bg-darkBg p-4 rounded-2xl shadow-lg">
      <h3 className="text-2xl font-medium text-white mb-4">Crypto News</h3>
      <ul className="space-y-4">
        {news.map((article, index) => (
          <li
            key={index}
            className="cursor-pointer hover:bg-gray-800 p-3 rounded-lg transition"
            onClick={() => onNewsClick(article)} // Pass the article to the parent
          >
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-lg mr-3 flex-shrink-0"
                src={article.imageurl}
                alt="news"
              />
              <div className="flex-1 overflow-hidden">
                <h4 className="text-lg font-bold text-green-400 truncate">
                  {article.title}
                </h4>
                <p className="text-gray-400 text-sm truncate">
                  {article.body.slice(0, 100)}...
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default NewsPreview;
