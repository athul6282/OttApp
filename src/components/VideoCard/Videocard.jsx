import React, { useEffect, useRef, useState } from 'react'
import './Videoscard.css'
import axios from 'axios'
import { imageUrl } from '../../constants/constants'
import { useNavigate } from "react-router-dom";

function Videocard(props) {

    const [movies, SetMovies] = useState([])
    const cardRef = useRef();
    const navigate = useNavigate();



    async function FetchMovies() {
        const response = await axios.get(props.url)
        const data = await response.data;
        console.log(data.results)
        SetMovies(data.results.filter(movie => movie.poster_path !== null));
    }
    async function HandleClick(id) {
        console.log(id)
        navigate(`/movie/${id}`)
    }


    const handleScroll = (direction) => {
        if (cardRef.current) {
            const cardWidth = 260;
            const gap = 10;
            const scrollAmount = (cardWidth + gap) * 5;

            cardRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    }
    useEffect(() => { FetchMovies() }, [])
    return (
        <div className='row'>
            <div className='row-header'>
                <h1>{props.title}</h1>
                {props.category && (
                    <button
                        className="see-more"
                        onClick={() => navigate(`/category/${props.category}`)}
                    >See More →</button>
                )}
            </div>
            <button className="scroll-btn scroll-left" onClick={() => handleScroll('left')}>❮</button>
            <div className='posters' ref={cardRef}>

                {movies.map((movie) =>
                    <div
                        className="poster-card"
                        key={movie.id}
                        onClick={() => HandleClick(movie.id)}
                    >
                        <img
                            className="poster-img"
                            src={imageUrl + movie.poster_path}
                            alt='posterImage'
                        />

                        <div className="poster-hover">
                            <h3>{movie.name || movie.title}</h3>

                            <div className="hover-actions">
                                <button className="watch-btn" onClick={() => navigate(`/movie/${movie.id}`)}>▶ Watch</button>
                                <button className="add-btn">+</button>
                            </div>

                            <p className="meta">
                                ⭐ {movie.vote_average?.toFixed(1)} • {(movie.first_air_date || movie.release_date)?.slice(0, 4)} • <span className='certificate'>{movie.adult ? 'A' : 'U/A'}</span>
                            </p>

                            <p className="overview">
                                {movie.overview}
                            </p>
                        </div>
                    </div>



                )}

            </div>
            <button className="scroll-btn scroll-right" onClick={() => handleScroll('right')}>❯</button>

        </div>
    )
}

export default Videocard