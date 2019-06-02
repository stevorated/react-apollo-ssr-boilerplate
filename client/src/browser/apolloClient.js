import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__)

const linkHttp = new HttpLink({
  ssrMode: false,
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

export default  new ApolloClient({
  cache,
  link
})