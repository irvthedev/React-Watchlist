
import React from 'react';

const MovieList = (props) => {
    const FavoriteComponent = props.favoriteComponent;
    const WatchListComponent = props.watchListComponent;
    if(props.movies.length > 0)
    {
        return (
            <>
                {props.movies.map((movie, index) => (
                    <div className='image-container d-flex justify-content-start m-3'>
                        <img src={movie.Poster} alt='movie' ></img>
                        <div className='overlay d-flex'>
                            <div onClick={ () => props.handleFavouritesClick(movie)} className='col'>
                                <FavoriteComponent/>  
                            </div>
                            <div onClick={ () => props.handleWatchListClick(movie)} className='col'>
                                <WatchListComponent/> 
                            </div>
                        </div>
                        
                    </div>
                    
                ))}
            </>
        )
    }
    
};

export default MovieList;