import React, { useEffect, useState } from 'react'
import './Herobanner.css'
import YouTube from 'react-youtube'
import { useParams } from 'react-router-dom'
import { API_KEY, imageUrl, GENRE_MAP } from '../../constants/constants'

const Herobanner = () => {
    const [movie, SetMovie] = useState({})
    const { movieId } = useParams()
    const [videoId, SetVideoId] = useState('')
    const [showModal, SetShowModal] = useState(false)
    const genres = movie.genre_ids ? movie.genre_ids.map(id => GENRE_MAP[id]).join(' • ') : '';


    async function MovieFetch() {
        console.log(movieId)
        const url = movieId ? `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
            : `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US`;
        const response = await fetch(url)
        const data = await response.json();
        if (movieId) {
            SetMovie(data)
            console.log(data)
        } else {
            SetMovie(data.results[15])
        }
    }
    async function HandleTrailer() {
        const url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
        const response = await fetch(url)
        const data = await response.json();

        if (data.results.length !== 0) {
            SetVideoId(data.results[0].key)
            SetShowModal(true)
        }
    }

    const opts = {
        playerVars: {
            autoplay: 1,
            origin: window.location.origin,
        },
    };

    useEffect(() => { MovieFetch() }, [movieId])

    return (
        <>
            <div className='herobanner' style={{ backgroundImage: `url(${imageUrl + movie.backdrop_path})` }}>

                <div className="hero-overlay"></div>

                <div className='hero-content'>
                    <h1 className='hero-title'>{movie.original_title}</h1>

                    <div className='hero-badges'>
                        <span className='badge'>Movie</span>
                        <span className='badge'>CC</span>
                        <span>{genres}</span>
                        <span className="badge"> ⭐ {movie.vote_average?.toFixed(1)}</span>
                    </div>

                    <div className='hero-buttons'>
                        <button className='btn btn-watch' onClick={HandleTrailer}>Watch</button>
                        <button className='btn btn-trailer' onClick={HandleTrailer}>Trailer</button>
                    </div>

                    <div className="hero-info">
                        <span>By Jon Favreau</span>
                        <span>|</span>
                        <span>2h 5min</span>
                    </div>
                    <p className="hero-description">
                        {movie.overview}
                    </p>
                </div>

            </div>

            {showModal && (
                <div className="video-modal" onClick={() => SetShowModal(false)}>
                    <div className="video-container" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => SetShowModal(false)}>✕</button>
                       <div className='youtube-wrapper'> {videoId && <YouTube videoId={videoId} opts={opts} />} </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Herobanner