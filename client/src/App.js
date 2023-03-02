import React from 'react';


import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
 import Login from './pages/Login';
import SingleListing from './pages/SingleListing';
import Profile from './pages/Profile';
import SearchResult from './pages/SearchResult';
import ContactRealtor from './pages/ContactRealtor';
// import {browser as Router, swithc, Route} from 'react-router-dom'

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
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
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
               <Route
                path="/login"
                element={<Login />}
              /> 
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/contactrealtor"
                element={<ContactRealtor />}
              />
              <Route
                path="/searchresult/:zip"
                element={<SearchResult />}
              />
              <Route
                path="/me"
                element={<Profile />}
              />
              <Route
                path="/profile"
                element={<Profile />}
              />
              <Route
                path="/listings/:property_id"
                element={<SingleListing />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
