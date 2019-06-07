import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { Redirect } from 'react-router'
import history from './history'

const { NODE_ENV } = process.env 
const isProd = (NODE_ENV === 'production') ? true : false

const cache = new InMemoryCache({
  addTypename: false
}).restore(window.__APOLLO_STATE__)

const linkHttp = new HttpLink({
  uri: 'http://localhost:4001/graphql',
  credentials: 'include',
  ssrForceFetchDelay: 100,
})

const errorLink = onError(({ graphQLErrors, networkError, operation, forward, response, error }) => {
  if (graphQLErrors){
    {!isProd && graphQLErrors.forEach((err)=> console.log(err.extensions.code))}
    if(graphQLErrors.find((err)=>err.extensions.code === 'UNAUTHENTICATED')) {
      history.push('/')
    }
    graphQLErrors.map(({message, path, extensions, locations}) =>
    !isProd ? console.log(
        `Error: Message: ${message} Path: ${path}`, 
      ) : false,
      // TODO: put session check every interval
    )}
  // if(extensions.code === 'UNAUTHENTICATED') {
  //   console.log('logout!!!!!!!!!!!!!!!')
  // }
  if(networkError) {
    !isProd ? console.log(networkError) : null
  }})

const links = [ errorLink, linkHttp ]
const link = ApolloLink.from(links)

export default  new ApolloClient({
  cache,
  link
})