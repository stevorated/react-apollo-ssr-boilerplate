import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import session from 'express-session'
import mongoDBStore from 'connect-mongodb-session'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import cookieParser from 'cookie-parser'
import path from 'path'
import { protectedStatic } from './auth'
import {
  APP_PORT,
  IN_PROD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  SESSION_NAME,
  SESSION_LIFE,
  SESSION_SECRET,
  SESSION_DB_COLLECTION,
  ASSETS_DIR
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

    app.use('/images', protectedStatic)
    const assetsDir = path.join(__dirname, ASSETS_DIR)
    app.use('/images', express.static(assetsDir))

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: IN_PROD ? false : {
        settings: {
          'request.credentials': 'same-origin'
        }
      },
      uploads: {
        maxFieldSize: 2000000,
        maxFiles: 10
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
      // multer: upload.single('avatar'),
      cors: corsOptions
      // graphqlUploadExpress: graphqlUploadExpress({ maxFileSize: 10000000 })
    })

    app.listen({ port: APP_PORT }, () =>
      console.log(`🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
    )
  } catch (err) { console.error(err) }
})()
