import React from 'react'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { fetchMorePosts } from '../../Store/actions'

import Posts from '.'
import Loading from '../Loading'
import { FETCH_MORE_POSTS, GET_MA_POSTS } from '../../Apollo/Queries'

const QueryMorePosts = (props) => {
  const length = props.posts.length
  console.log(length)
  return (
    <Query 
    query={FETCH_MORE_POSTS}
    variables={{ limit: 5, skip: 5 }}
    onCompleted={
      ({getMyPosts})=> {
        props.fetchMorePosts(getMyPosts)
      }
    }
    // refetchQueries={[{query:GET_MA_POSTS, variables:{limit: 10, skip: 0 }}]}
    >
    {({ loading, error, data, fetchMore }) => {
      // console.log(prev)
      const handleFatchMore = () => {
        fetchMore({
          variables: {
            skip: length
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            // console.log(
            //   [...prev.getMyPosts, ...fetchMoreResult.getMyPosts]
            // )
            if (!fetchMoreResult) return prev
            props.fetchMorePosts(
              [...fetchMoreResult.getMyPosts]
            ) 
          }
        })
      }
      if (loading) return <Loading />
      if (error) return <h1>`Error! ${error}`</h1>
      return (
        <button onClick={handleFatchMore}>get More</button>
      );
    }}
  </Query>
  )
}

const mapStateToProps = ({posts}) => {
  return { posts }
}

export default connect(mapStateToProps, {fetchMorePosts})(QueryMorePosts)


