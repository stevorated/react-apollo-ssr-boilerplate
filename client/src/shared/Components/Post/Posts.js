import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Post } from '../../Elements'


function Posts(props) {
  
  const renderQuery = () => {
    if(props.myPostsMode) {
      return props.posts.map(({ id, body, comments, createdAt, createdBy })=>{
        const myName = `${createdBy.fname} ${createdBy.lname}`
        return <Post key={id} myPostsMode={true} body={body} name={myName} comments={comments} createdAt={createdAt} id={id} />
      })
    } else if (props.feedMode) {
      return props.feed.map(({ id, body, comments, createdAt, createdBy })=>{
        const myName = `${createdBy.fname} ${createdBy.lname}`
        return <Post key={id} feedMode={true} body={body} name={myName} comments={comments} createdAt={createdAt} id={id} />
      })
    }
  }
    return (
      <div>
        {(props.posts && props.myPostsMode || props.feed) && renderQuery()}
      </div>
    )
  }

function mapStateToProps({ posts, feed }) {

  return { posts, feed }
}

export default connect(mapStateToProps)(Posts)


