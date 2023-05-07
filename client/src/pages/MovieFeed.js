import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { getMoviesByGenres } from '../utils/API';
import { GET_USER_GENRES } from '../utils/mutations';


const MovieFeed = ({ userId }) => {
  const [movies, setMovies] = useState([]);
  const { data, refetch } = useQuery(GET_USER_GENRES, {
    variables: { userId },
  });

  const fetchMovies = async () => {
    if (!data || !data.user) return;

    try {
      const movieData = await getMoviesByGenres(data.user.genres);
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

  if (!data || !data.user) return <p>Loading...</p>;

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
