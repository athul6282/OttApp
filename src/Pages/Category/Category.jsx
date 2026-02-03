import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { imageUrl } from "../../constants/constants";
import * as urls from "../../urls";  
import "./Category.css";

const Category = ({ url: propUrl, title: propTitle }) => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const url = propUrl || urls[category];
  const title = propTitle || category?.toUpperCase();

  useEffect(() => {
    async function fetchCategoryMovies() {
      if (!url) return;

      const response = await axios.get(url);
      setMovies(response.data.results);
    }

    fetchCategoryMovies();
  }, [url]);

  return (
    <div className="category-page">
      <h1 className="category-title">
        {title}
      </h1>

      <div className="category-grid">
        {movies.map((movie) => (
          <div className="category-card" key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
            <img
              src={imageUrl + movie.poster_path}
              alt={movie.title}
              className="category-img"
            />
            <div className="category-hover">
              <h3>{movie.title}</h3>
              <div className="hover-actions">
                <button className="watch-btn" onClick={(e) => { e.stopPropagation(); navigate(`/movie/${movie.id}`); }}>▶ Watch</button>
                <button className="add-btn">+</button>
              </div>
              <p className="meta">
                ⭐ {movie.vote_average?.toFixed(1)} • {(movie.release_date)?.slice(0, 4)} • <span className='certificate'>{movie.adult ? 'A' : 'U/A'}</span>
              </p>
              <p className="overview">
                {movie.overview}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
