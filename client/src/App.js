import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css";
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import SignupForm from './pages/Home';
import SignupForm from './pages/Profile';

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
  });

function App() {
    return (
    <ApolloProvider client={client}>
      {/* Wrap page elements in Router component to keep track of location state */}
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              {/* Define routes to render different page components at different paths */}
              <Route 
                path="/" 
                element={<LoginForm />} 
              />
              {/* Define a route that will take in variable data */}
              <Route 
                path="/signup" 
                element={<SignupForm />} 
              />
              <Route 
                path="/home" 
                element={<Home />} 
              />
              <Route 
                path="/profile/:userId" 
                element={<UserProfile />} 
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
    )
}

export default App;