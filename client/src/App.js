import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import MovieFeed from './pages/MovieFeed';
import UserProfile from './pages/UserProfile';
import NavBar from './components/Navbar';
import GenreSelectionPage from './pages/GenreSelection';
import Auth from './utils/auth';

const client = new ApolloClient({
  uri: '/graphql',
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
