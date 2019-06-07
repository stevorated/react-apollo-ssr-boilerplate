import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import session from 'express-session'
import mongoDBStore from 'connect-mongodb-session'
// import connectRedis from 'connect-redis'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import cookieParser from 'cookie-parser'
import {
  APP_PORT,
  IN_PROD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  SESSION_NAME,
  SESSION_LIFE,
  SESSION_SECRET,
  SESSION_DB_COLLECTION
} from './config'
import schemaDirectives from './directives'

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

    const MongoSessionStore = mongoDBStore(session)
    const store = new MongoSessionStore({
      uri: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      collection: SESSION_DB_COLLECTION
    })

    store.on('error', function (error) {
      console.log(error)
    })

    app.use(session({
      store,
      name: SESSION_NAME,
      secret: SESSION_SECRET,
      resave: true,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(SESSION_LIFE),
        sameSite: true,
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
