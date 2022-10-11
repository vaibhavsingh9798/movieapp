import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MovieList from './component/movielist/MovieList';
import Movie from './component/movie/Movie';

function App() {
  return (
    <>
    <div className='title'>
      <h1>MovieApp</h1>
      </div>
     <BrowserRouter>
     <Routes>
      <Route exact path="/" element={<MovieList />}/>
      <Route exact path="/movie/:id" element={<Movie />} />
     </Routes>
     </BrowserRouter>
     </>
  );
}

export default App;
