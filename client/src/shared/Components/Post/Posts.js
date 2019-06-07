import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Post } from '../../Elements'


function Posts({posts}) {
  
  const renderQuery = () => {
    return posts.map(({ id, body, comments, createdAt, createdBy })=>{
      const myName = `${createdBy.fname} ${createdBy.lname}`
      return <Post key={id} body={body} name={myName} comments={comments} createdAt={createdAt} id={id} />
    })
  }
    return (
      <div>
        {posts && renderQuery()}
      </div>
    )
  }

function mapStateToProps({ posts }) {

  return { posts }
}

export default connect(mapStateToProps)(Posts)


