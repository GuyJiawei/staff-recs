import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../utils/mutations';
import Auth from '../utils/auth';

function UserProfile() {
  const { userId } = useParams();
  const { loading, data } = useQuery(GET_USER_PROFILE, {
    variables: { userId: userId || Auth.getProfile().data._id },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data.user;

  return (
    <div className="container">
      <h2>{user.username}'s Profile</h2>
      <h3>Genres</h3>
      <ul>
        {user.genres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserProfile;
