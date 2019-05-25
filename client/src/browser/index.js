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

import client from './apolloClient'
import reducers from '../shared/Store/reducers'
import Layout from '../shared/Routes/Layout'
// import 'bootstrap/dist/css/bootstrap.css'
const initialState = window.__INITIAL_STATE__ 
import styled from 'styled-components'

const store = createStore(
  reducers, 
  initialState, 
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
delete window.__INITIAL_STATE__

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  font-size: 40px;
  background: linear-gradient(20deg, rgb(219, 112, 147), #daa357);
`;