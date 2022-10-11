import React from 'react';
import {useState,useEffect} from 'react';
import ReactPaginate from "react-paginate";
import axios from 'axios';
import MovieCard from '../moviecard/MovieCard';
import './movielist.css';

const MovieList = () =>{
    const [data,setData] = useState([]);
    const [isLoding,setIsLoading] = useState(false);
    const [error,setError] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [filterData,setFilterData] = useState([]);
    const [filterBy,setFilterBy] = useState('text');
    const [search,setSearch] = useState('');

   
     const API_URL = 'https://movie-task.vercel.app/api/popular?page=1';
     const getMovies = async () =>{
      try{
        setIsLoading(true);
        setError('');
         const response = await axios.get(API_URL);
         setData(response.data.data.results);
         setFilterData(response.data.data.results);
      }catch{
        
        setError(true);
      }finally{
        setIsLoading(false);
      }
    }
    useEffect(()=>{
      getMovies();
    },[])
    
  
    const handleClick= ()=>{
         if(filterBy === 'all')
         setFilterData(data);
         if(filterBy === 'name'){
         let newData = data.filter((item) => {
                 if(search === '' )
                   return data;
                  else
                return  item.title.toLowerCase().includes(search.toLowerCase())
              });
              setFilterData(newData);
        }
        if(filterBy === 'year'){
          let newData = data.filter((item) => {
            if(search === '' )
              return data;
             else
           return  item.release_date.includes(search)
         });
         setFilterData(newData);
        }
        if(filterBy === 'rating'){
          let newData = data.filter((item) => {
            if(search === '' )
              return data;
             else
           return  item.vote_average >= search
         });
         setFilterData(newData);
        }
    }
    const usersPerPage = 20;
    const pagesVisited = pageNumber * usersPerPage;
    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
    const pageCount = Math.ceil(data.length / usersPerPage);
    return (
    <>
    <div className='serach'>
      <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
         <option value="all">All</option>
         <option value="name">By Name</option>
         <option value="year">By Year</option>
         <option value="rating">By Rating</option>
        </select>
        {/* </div> */}
    <input type={filterBy==='name'?'text':'number'} placeholder="Search Movie" value={search} onChange={(e) => setSearch(e.target.value)} />
    <button onClick={() => handleClick()}>Search</button>
    </div>
    <div className='movie-container'>
      {isLoding && <h3>Plase wait...</h3>}
      {error && <h3>Something wrong try again.</h3>}
      { !!filterData.length &&  
        filterData.slice(pagesVisited, pagesVisited + usersPerPage).map((item,ind) => {
            return(
                <div key={item.id} className='items'>
                   
                    <MovieCard movie={item}/>
                  
                </div>
            )
        })
       
      }
       </div>
       <div className="pagination">
       {!isLoding && <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
        /> }
        </div>
    </>
      )
       
    }

export default MovieList;