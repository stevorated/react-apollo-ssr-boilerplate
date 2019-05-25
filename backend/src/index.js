import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import cookieParser from 'cookie-parser'
import {
  APP_PORT, IN_PROD, DB_HOST, DB_PORT, DB_NAME, SESSION_NAME, SESSION_LIFE, SESSION_SECRET, REDIS_HOST, REDIS_PASS, REDIS_PORT
} from './config'
import schemaDirectives from './directives';

(async () => {
  try {
    await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    const app = express()
    app.use(cookieParser('sid'))
    app.disable('x-powered-by')

    const RedisStore = connectRedis(session)

    const store = new RedisStore({
      host: REDIS_HOST,
      port: REDIS_PORT,
      pass: REDIS_PASS
    })

    app.use(session({
      store,
      name: SESSION_NAME,
      secret: SESSION_SECRET,
      resave: true, // extend session life
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(SESSION_LIFE),
        sameSite: false,
        secure: IN_PROD
      }
    }))

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: IN_PROD ? false : {
        settings: {
          'request.credentials': 'same-origin'
        }
      },
      context: ({ req, res }) => ({ req, res })
    })

    const corsOptions = {
      origin: 'http://localhost:3000',
      credentials: true,
      sameSite: true
    }

    server.applyMiddleware({
      app,
      cors: corsOptions
    })

    app.listen({ port: APP_PORT }, () =>
      console.log(`🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
    )
  } catch (err) { console.error(err) }
})()
