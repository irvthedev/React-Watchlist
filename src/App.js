
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';


const App = () => {
  const [movies,setMovies] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
      const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=525001e1`;

      const response = await fetch(url);
      const responseJson = await response.json();

      // if anything is returned, set movies
      if(responseJson.Search){
        setMovies(responseJson.Search);
      }

  };

  // called for every change on search value
  useEffect( () => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  return (
    <div className='container-fluid movie-app'>
        <div className='row d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading='Movies'/>
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
        </div>
        <div className='row'>
            <MovieList movies = {movies} />
        </div>
    </div>
  ); 
  
};


export default App;
