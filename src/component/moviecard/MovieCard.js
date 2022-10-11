import './moviecard.css';
import React from 'react';
import { Link } from 'react-router-dom';
const MovieCard = ({movie}) =>{
    const imgURL= 'https://image.tmdb.org/t/p/original';
    return(
        <>
            <div className="item">
            <Link to={`/movie/${movie.id}`}>
            <img src={imgURL+movie.poster_path} alt={movie.title} />
            </Link>
            <div className='item-details'>
             {movie.title}<br/>
             {movie.release_date}
             </div>
             </div>
           
        
        </>
    )
}
export default React.memo(MovieCard);