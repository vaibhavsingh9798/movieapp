import { useEffect,useState } from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';
import "./movie.css"

const Movie = () =>{
  const [movie,setMovie] = useState({});
  const [error,setError] = useState('');
    const imgURL= 'https://image.tmdb.org/t/p/original';
    const API_URL = `https://movie-task.vercel.app/api/movie?movieId`
    let {id} = useParams();
    const getMovieDetails = async () => {
      try{
        setError('');
       const {data} = await  axios.get(`${API_URL}=${id}`)
        setMovie(data.data)
      }catch{
         setError(true);
      }
       
      
    }
    useEffect(()=>{
      getMovieDetails();
    },[])
    return(
        <>
          
           <div className='single-container'>
            <div className="movie">
           
            {error && <h3>Something wrong try again.</h3>}
            { <img src={imgURL+movie.poster_path} alt={movie.title} /> }
            <div className="movie-details">
             { movie.original_title}<br/>
              {movie.release_date}<br/>
              {movie.vote_average}<br/>
              {movie.overview}

            </div>
            </div>
            </div>
        
        </>
    )
}
export default Movie;