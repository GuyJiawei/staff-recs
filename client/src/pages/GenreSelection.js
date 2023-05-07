import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from '../utils/auth';
import { CREATE_USER_GENRE } from '../utils/mutations';
import { DELETE_USER_GENRE } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';

const GenreSelectionPage = ({ userId }) => {
  const [savedGenres, setSavedGenres] = useState([]);
  const [createUserGenres] = useMutation(CREATE_USER_GENRE);
  const navigate = useNavigate();

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

  const handleGenreClick = (genre) => {
    if (savedGenres.includes(genre)) {
      setSavedGenres(savedGenres.filter((g) => g !== genre));
    } else {
      setSavedGenres([...savedGenres, genre]);
    }
  };

  const handleSaveGenres = async () => {
    try {
      await createUserGenres({
        variables: { userId, genres: savedGenres },
      });
      navigate('/movie-feed');
    } catch (error) {
      console.error('Error updating user genres:', error);
    }
  };

  return (
    <div>
      {/* ... */}
      <div>
        {genres.map((genre) => (
          <button
            key={genre.genreId}
            onClick={() => handleGenreClick(genre)}
            style={{
              backgroundColor: savedGenres.includes(genre) ? 'lightblue' : '',
            }}
          >
            {genre.name}
          </button>
        ))}
      </div>
      <button onClick={handleSaveGenres}>Save and Show Movies</button>
    </div>
  );
};

export default GenreSelectionPage;
