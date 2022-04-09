
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorite from './components/AddFavorites';
import RemoveFavourites from './components/RemoveFavourite';


const App = () => {
  const [movies,setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchValue) => {
      const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=525001e1`;

      const response = await fetch(url);
      const responseJson = await response.json();

      // if anything is returned, set movies
      if(responseJson.Search){
        setMovies(responseJson.Search);
      }

  };

  useEffect( () => {
    const movieFavourites = JSON.parse(
        localStorage.getItem('react-movie-app-favourites')
    );

    setFavourites(movieFavourites);

  }, []);

  // called for every change on search value
  useEffect( () => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  };

  // add movie to favourites
  const addFavouriteMovie = (movie) => {
    const newFavouteList = [...favourites, movie]
    setFavourites(newFavouteList)
    saveToLocalStorage(newFavouteList);
  };

  // removing from favourites
  const removeFavouriteMovie = (movie) => {
    // remove movie from list of favourites, compare ids
    const newFavouriteList = favourites.filter(
        (favourite) => favourite.imdbID !== movie.imdbID);
    console.log(newFavouriteList);
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  return (
    <div className='container-fluid movie-app'>
        <div className='row d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading='Movies'/>
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
        </div>
        <div className='row'>
            <MovieList movies={movies} favoriteComponent={AddFavorite} handleFavouritesClick = {addFavouriteMovie}/>
        </div>

        <div className='row d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading='Favourites'/>
        </div>
        <div className='row'>
            <MovieList movies={favourites} favoriteComponent={RemoveFavourites} handleFavouritesClick = {removeFavouriteMovie}/>
        </div>

    </div>
  ); 
  
};


export default App;
