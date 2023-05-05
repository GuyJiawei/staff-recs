// import React from 'react';
// import { useQuery, gql } from '@apollo/client';
// import { GET_MOVIES_BY_GENRES } from "../utils/mutations";

// const MovieFeed = ({ userGenres }) => {
//     const { loading, error, data } = useQuery(GET_MOVIES_BY_GENRES, {
//       variables: { genres: userGenres },
//     });
  
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;
  
//     return (
//       <div>
//         <h2>Recommended Movies</h2>
//         <div>
//           {data.getMoviesByGenres.map((movie) => (
//             <div key={movie.id}>
//               <h3>{movie.title}</h3>
//               <p>Genre: {movie.genre}</p>
//               <p>Release Date: {movie.releaseDate}</p>
//               <p>Description: {movie.description}</p>
//               {movie.posterUrl && <img src={movie.posterUrl} alt={movie.title} />}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
// };
  
// export default MovieFeed;