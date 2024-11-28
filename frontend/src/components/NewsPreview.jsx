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
    <div className=" bg-darkBg  p-4  rounded-2xl shadow-lg">
      <h3 className="text-2xl  font-medium text-white mb-4">Crypto News</h3>
      <ul className="space-y-4">
        {news.map((article, index) => (
          <li
            key={index}
            className="cursor-pointer hover:bg-gray-800 p-3 rounded-lg transition"
            onClick={() => onNewsClick(article)} // Pass the article to the parent
          >
            <div className="flex items-center">
            <img className="w-[40px] h-[40px ] rounded-lg mr-3" src={article.imageurl} alt="image" />
            <h4 className="text-lg font-bold text-green-400">
              {article.title}
            </h4>
            </div>
            
            <p className="text-gray-400 text-sm truncate">
              {article.body.slice(0, 100)}...
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsPreview;
