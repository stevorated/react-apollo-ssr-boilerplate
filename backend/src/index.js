// import { readFileSync } from 'fs'
// import https from 'https'
import path from 'path'
import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import session from 'express-session'
import mongoDBStore from 'connect-mongodb-session'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import cookieParser from 'cookie-parser'
import errorHandler from 'errorhandler'
import { protectedStatic } from './auth'
import helmet from 'helmet'
import schemaDirectives from './directives'
// import passport from 'passport'
// import FacebookStrategy from 'passport-facebook'

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
  // APP_ID,
  // APP_SECRET
} from './config'

(async () => {
  try {
    await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })

    const app = express()
    // ================================================ FB LOGIN ==============================
    // console.log(APP_ID, APP_SECRET, 'dsfdsf')
    // passport.use(new FacebookStrategy({
    //   clientID: APP_ID,
    //   clientSecret: APP_SECRET,
    //   callbackURL: 'https://2ec492c1.ngrok.io/auth/facebook/callback',
    //   profileFields: ['id', 'name', 'email']
    // },
    // function (accessToken, refreshToken, profile, cb) {
    //   console.log(accessToken)
    //   console.log(refreshToken)
    //   // console.log(profile.id)
    //   // console.log(profile.name)
    //   // console.log(profile)
    //   cb(undefined, profile)
    // }))
    // app.use(passport.initialize())
    // passport.serializeUser(function (user, done) {
    //   done(null, user)
    // })
    // app.get('/fblogin',
    //   passport.authenticate('facebook'))
    // app.get('/auth/facebook/callback',
    //   passport.authenticate('facebook', { failureRedirect: '/login' }),
    //   function (req, res) {
    //     // console.log(res)
    //     // Successful authentication, redirect home.
    //     res.send('auth GOOD!')
    //   })
    // ==================================== END FB LOGIN =====================================
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
      httpOnly: IN_PROD,
      // rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(SESSION_LIFE),
        sameSite: true,
        secure: IN_PROD // TODO: bring back IN_PROD
      }
    }))
    app.use('/images', protectedStatic)
    const assetsDir = path.join(__dirname, '..', ASSETS_DIR)
    app.use('/images', express.static(assetsDir))

    if (!IN_PROD) app.use(errorHandler({ dumpExceptions: true, showStack: true }))

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
      sameSite: false
    }

    server.applyMiddleware({
      app,
      cors: corsOptions
    })
    app.use(helmet())
    app.get('/', (req, res) => {
      res.status(200).send('Ya Alla')
    })
    app.listen({ port: APP_PORT }, () =>
      console.log(`🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
    )
  } catch (err) { console.error(err) }
})()

// const credentials = {
//   cert: readFileSync(path.join(__dirname, '../config/certificates', 'wodc-cert.pem')),
//   key: readFileSync(path.join(__dirname, '../config/certificates', 'wodc-key.pem'))
// }
// const httpsServer = https.createServer(credentials, app)
// // httpsServer.listen(APP_PORT)
// server.installSubscriptionHandlers(httpsServer)
// httpsServer.listen({ port: APP_PORT }, () =>
//   console.log(`🚀 Https Server ready at https://localhost:${APP_PORT}${server.graphqlPath}`)
// )
