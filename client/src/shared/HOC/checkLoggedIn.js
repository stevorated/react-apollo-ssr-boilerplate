import React from 'react'
import { Redirect } from 'react-router'
import { Query } from 'apollo-client'
import { GET_ME } from '../Apollo/Queries'
import { logoutUser } from '../Store/actions'

const checkLoggedIn = () => (
  <Query
    query={GET_ME}
    pollInterval={500}
  >
    {({ loading, error, data, startPolling, stopPolling }) => {
      if (loading) return null
      if (error) return console.log(error)
      return (
        <Redirect to="/" />
      );
    }}
  </Query>
)

export default checkLoggedIn