
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorite from './components/AddFavorites';
import RemoveFavourites from './components/RemoveFavourite';
import AddMovieToWatch from './components/AddMovieToWatch';
import RemoveWatchList from './components/RemoveMovieToWatch';


const App = () => {
  const [movies,setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);
  const [watchList, setWatchList] = useState([]);

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

    if(movieFavourites != null)
    {
        setFavourites(movieFavourites);
    }

    const movieWatchList = JSON.parse(
        localStorage.getItem('react-movie-app-watchlist')
    );

    if(movieWatchList != null)
    {
        setWatchList(movieWatchList);
    }

  }, []);

  // called for every change on search value
  useEffect( () => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  const saveFavoriteToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  };

  const saveWatchListToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-watchlist', JSON.stringify(items))
  };

  // add movie to favourites
  const addFavouriteMovie = (movie) => {
    
        const newFavouteList = [...favourites, movie];
        setFavourites(newFavouteList);
        saveFavoriteToLocalStorage(newFavouteList);
  };

  // removing from favourites
  const removeFavouriteMovie = (movie) => {
    // remove movie from list of favourites, compare ids
    const newFavouriteList = favourites.filter(
        (favourite) => favourite.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList);
    saveFavoriteToLocalStorage(newFavouriteList);
  }

  // add movie to favourites
  const addWatchListMovie = (movie) => {
    const newWatchList = [...watchList, movie];
    setWatchList(newWatchList);
    saveWatchListToLocalStorage(newWatchList);
};

 // removing from favourites
 const removeWatchListMovie = (movie) => {
     console.log("removing from watch");
    // remove movie from list of favourites, compare ids
    const newToWatchList = watchList.filter(
        (watch) => watch.imdbID !== movie.imdbID);
        setWatchList(newToWatchList);
        saveWatchListToLocalStorage(newToWatchList);
  }

  return (
    <div className='container-fluid movie-app'>
        <div className='row d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading='Movies'/>
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
        </div>
        <div className='row'>
            <MovieList movies={movies} 
                favoriteComponent={AddFavorite} 
                handleFavouritesClick={addFavouriteMovie}
                watchListComponent={AddMovieToWatch}
                handleWatchListClick={addWatchListMovie}
            />
        </div>

        <div className='row d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading='Watch List'/>
        </div>
        <div className='row'>
            <MovieList movies={watchList} 
                favoriteComponent={AddFavorite} 
                handleFavouritesClick={addFavouriteMovie}
                watchListComponent={RemoveWatchList}
                handleWatchListClick={removeWatchListMovie}
            
            />
        </div>

        <div className='row d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading='Favourites'/>
        </div>
        <div className='row'>
            <MovieList movies={favourites} favoriteComponent={RemoveFavourites} handleFavouritesClick = {removeFavouriteMovie}
            watchListComponent={AddMovieToWatch}
            handleWatchListClick={addWatchListMovie}
            />
        </div>

    </div>
  ); 
  
};


export default App;
