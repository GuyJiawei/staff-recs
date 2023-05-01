const axios = require('axios');
const apiKey = '4673261d';

async function fetchMovieData(title) {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`);
    const movieData = response.data;

    if (movieData.Response === 'True') {
      return {
        title: movieData.Title,
        genre: movieData.Genre,
        releaseDate: movieData.Released,
        description: movieData.Plot,
        posterUrl: movieData.Poster,
      };
    } else {
      console.error(`Error fetching movie data for "${title}": ${movieData.Error}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching movie data for "${title}": ${error.message}`);
    return null;
  }
}

module.exports = fetchMovieData;
