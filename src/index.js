import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import {ApolloClient, HttpLink, InMemoryCache, ApolloProvider} from '@apollo/client';
import { relayStylePagination } from "@apollo/client/utilities"
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: relayStylePagination(),
        },
      },
    },
  }),
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors)
    console.log("networkError", networkError)
  },
  link: new HttpLink({
    uri: 'http://localhost:4000',
  })
})




  ReactDOM.render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
  )


