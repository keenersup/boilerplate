import React from 'react';
import App from './App'

import ApolloClient from 'apollo-client'
import { InMemoryCache } from "apollo-cache-inmemory";
import {ApolloLink} from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { ApolloProvider } from '@apollo/react-hooks'

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_CLIENT_ORIGIN || 'http://localhost:6060/graphql',
    credentials: "include",
});

const authLink = setContext(() => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

/********* ********* ********* ********* ********* ********* ********* ********* *********
 todo: some special error message
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );
    }
    if (networkError) {
        console.log(`[Network error]: ${networkError}`)
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
        errorLink,
        authLink,
        httpLink,
    ]),
})

export default (
    <ApolloProvider client={client}>
            <App />
    </ApolloProvider>
)