import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { getMoviesByGenres } from '../utils/API';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';


const MovieFeed = () => {
  const userId = Auth.getProfile().data._id;
  const [movies, setMovies] = useState([]);
  const { data, loading} = useQuery(QUERY_ME);
  const savedGenres = data?.me.savedGenres.join(',');

  const fetchMovies = async () => {

    try {
      const movieData = await getMoviesByGenres(savedGenres);
      setMovies(movieData.results);
    } catch (error) {
      console.error('Error fetching movie suggestions:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [data]);

  const handleRefreshSuggestions = () => {
    fetchMovies();
  };

  if (!movies || !data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Movie Suggestions</h2>
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
      <button onClick={handleRefreshSuggestions}>Refresh Suggestions</button>
    </div>
  );
};

export default MovieFeed;
