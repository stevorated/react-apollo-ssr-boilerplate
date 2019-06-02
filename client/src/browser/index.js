import 'babel-polyfill'
import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import Helmet from 'react-helmet'
// import client from './apolloClient'
import reducers from '../shared/Store/reducers'
import Layout from '../shared/Routes/Layout'

import '../assets/css/bootstrap.min.css'
import '../assets/css/style.css'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__)

const linkHttp = new HttpLink({
  ssrMode: true,
  uri: 'http://localhost:4001/graphql',
  credentials: 'include',
  ssrForceFetchDelay: 100,
})

const errorLink = onError(({ graphQLErrors, networkError, operation, forward, response }) => {
  // operation.setContext({context: {errors: []}})
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      // const context = operation.getContext().context.errors
      // context.push(err.message)
      // operation.setContext({context: {
      //   errors: context
      // }})
      // console.log(operation.getContext())
    }
  }
  if(networkError) {
    console.log(networkError)
  }})

const links = [ errorLink, linkHttp ]
const link = ApolloLink.from(links)

const client =  new ApolloClient({
  cache,
  link
})

const store = createStore(
  reducers, 
  window.__INITIAL_STATE__ , 
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(client)))
  )

hydrate(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
  ,document.getElementById('root')
)
