import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './index.css';
import './media.css';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from "@apollo/client"

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://blooming-beyond-15284.herokuapp.com/api/graphql",
    credentials: 'include',
  }),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
