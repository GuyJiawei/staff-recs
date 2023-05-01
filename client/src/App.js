import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css";
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import MovieFeed from './pages/MovieFeed';
import UserProfile from './pages/UserProfile';
import MovieFeed from './pages/MovieFeed';

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
  });

function App() {
    return (
    <ApolloProvider client={client}>
      <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route 
                path="/" 
                element={<LoginForm />} 
              />
              <Route 
                path="/signup" 
                element={<SignupForm />} 
              />
              <Route 
                path="/moviefeed" 
                element={<MovieFeed />} 
              />
              <Route 
                path="/profile/:userId" 
                element={<UserProfile />} 
              />
            </Routes>
          </div>
          <Footer />
      </Router>
    </ApolloProvider>
    )
}

export default App;