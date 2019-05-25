import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
const linkHttp = new HttpLink({
  ssrMode: true,
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
})

const errorLink = onError(({ graphQLErrors, networkError, operation, forward, response }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      console.log(graphQLErrors)
      switch (err.extensions.code) {
        case 'UNAUTHENTICATED':
          console.log(err)
          break
      }
    }
  }
  if(networkError) {
    console.log(networkError)
  }
}
)

const links = [ errorLink, linkHttp ]
const link = ApolloLink.from(links)

const initialApolloState = window.__APOLLO_STATE__
// delete window.__APOLLO_STATE__

const cache = new InMemoryCache().restore(initialApolloState)
delete window.__APOLLO_STATE__

export default new ApolloClient({
  cache,
  link
})






