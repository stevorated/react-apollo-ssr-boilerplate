import React from 'react'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import serialize from 'serialize-javascript'
import { ServerStyleSheet } from 'styled-components'


import Layout from '../../shared/Routes/Layout'
// import 'bootstrap/dist/css/bootstrap.css'
import '../../assets/css/style.css'

export default function renderer(req, store, client, context) {
  
  const sheet = new ServerStyleSheet()


  const App = (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <Layout />
      </StaticRouter>
    </Provider>
  </ApolloProvider>
  )
  const content = renderToString(sheet.collectStyles(App))
  const styles = sheet.getStyleTags()
  const helmet = Helmet.renderStatic()
  return `
  <html>
      <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${styles}
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
      <link rel="stylesheet" href="styles/main.css"/>
      </head>
      <body>
        <div id="root">${content}</div>
        <div id="portal"></div>
        <script>
          window.__INITIAL_STATE__ = ${serialize(store.getState())}
        </script>
        <script>
          window.__APOLLO_STATE__ = ${serialize(client.extract())}
        </script>

        <script src="bundle.js"></script>
      </body>
    </html>
  
  `
}

