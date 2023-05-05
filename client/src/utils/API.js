// frontend/src/api.js
import axios from 'axios';

const API_KEY = '17a6355f2a7004c806bbc70ebd5a8bfc';
const BASE_URL = 'https://api.themoviedb.org/3';



// Function to fetch movies by genre
const getMoviesByGenres = async (genreIds, page = 1) => {
  const genres = [
    {
      name: 'Action',
      genreId: '28'
    },
    {
      name: 'Comedy',
      genreId: '35'
    },
    {
      name: 'Drama',
      genreId: '18'
    },
    {
      name: 'Horror',
      genreId: '27'
    },
    {
      name: 'Science Fiction',
      genreId: '878'
    },
    {
      name: 'Family',
      genreId: '10751'
    },
    {
      name: 'Romance',
      genreId: '10749'
    }
  ];

  try {
    const genreIdString = genreIds.join(',');
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: genreIdString,
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching movies by genres:', error);
    throw error;
  }
};


// Function to fetch genre list
const getGenreList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
      },
    });

    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genre list:', error);
    throw error;
  }
};

export { getMoviesByGenre, getGenreList };
