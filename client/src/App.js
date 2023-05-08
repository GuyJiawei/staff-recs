import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import MovieFeed from './pages/MovieFeed';
import UserProfile from './pages/UserProfile';
import NavBar from './components/Navbar';
import GenreSelectionPage from './pages/GenreSelection';
import Auth from './utils/auth';
import { setContext } from '@apollo/client/link/context';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar />
        <div className="container">
          {Auth.loggedIn() ? (
            <button className="btn btn-lg btn-light m-2" onClick={logout}>
              Logout
            </button>
          ) : null}
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/genreSelection" element={<GenreSelectionPage />} />
            <Route path="/moviefeed" element={<MovieFeed />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
