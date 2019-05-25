import express from 'express'
import cors from 'cors'
import { matchRoutes } from 'react-router-config'
import proxy from 'express-http-proxy'
import cookieParser from 'cookie-parser'
import routes from '../shared/Routes/mainRoutes'
import { renderer, createStore } from '../helpers'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'

const { GRAPH_URL }  = process.env
const PORT = process.env.PORT || 3000
const app = express()
app.use(cookieParser())
app.use(cors())
app.use(express.static('build/public'))

app.get('*', async (req, res, next) => {
  


  const linkHttp = createHttpLink({
    uri: GRAPH_URL,
    credentials: 'include',
    headers: {
      cookie: req.header('Cookie')
    },
    fetch
  })

  const errorLink = onError(({ graphQLErrors, networkError, operation, forward, response }) => {
    if (graphQLErrors) {
      console.log(graphQLErrors)
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
            console.log(err)
        }
      }
    }
  }
  )
  
  const links = [ errorLink, linkHttp ]
  const link = ApolloLink.from(links)

  const client = await new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link
  })
  const store = await createStore(client)

  const promises = matchRoutes(routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null
    }).map(promise => {
      if (promise) {
        return new Promise((resolve, rej) => {
          promise.then(resolve).catch(resolve)
        })
      }
    })

  await Promise.all(promises).then(() => {
    const context = {}
    
    if (context.url) {
      return res.redirect(301, context.url)
    }
    if (context.notFound) {
      res.status(404)
    }
    

    const html = renderer(req, store, client, context)
    res.status(200).send(html)
  })
})

app.listen(PORT, (req, res) => {
  console.log(`APP IS RUNNING ON PORT ${PORT}`)
})

