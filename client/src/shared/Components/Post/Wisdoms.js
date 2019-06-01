import React, { Component } from 'react'

import { Wisdom } from '../../Elements'
import { connect } from 'react-redux'
import { fetchMyPosts } from '../../Store/actions'


function Wisdoms({posts}) {
  const renderQuery = () => {
    const myName = `${posts.fname} ${posts.lname}`
    return posts.posts.map(({ id, body, comments, createdAt })=>{
      return <Wisdom key={id} body={body} name={myName} comments={comments} createdAt={createdAt} id={id} />
    })
  }
    return (
      <div>
        {posts.posts && renderQuery()}
      </div>
    )
  }

function mapStateToProps({ posts }) {
  return { posts }
}

export default connect(mapStateToProps)(Wisdoms)


