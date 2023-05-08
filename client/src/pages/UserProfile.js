import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_USER_GENRE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const [savedGenres, setSavedGenres] = useState([]);
  const [updateUser] = useMutation(CREATE_USER_GENRE);
  const navigate = useNavigate();
  const { loading, data } = useQuery(QUERY_ME);


  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data?.me;

  return (
    <div className="container">
      <h2>{user.username}'s Profile</h2>
      <h3>All your Genres</h3>
      <ul>
        {user.savedGenres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
      <a href="/genreselection">Change your genre preferences</a>
    </div>
  );
}

export default UserProfile;
