import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { Post } from '../../Components'
import Avatar from '../../../assets/new_logo.png'
const imgAvatar = Avatar.replace('build', '').replace('/public', '')

function Posts(props) {
  
  const renderQuery = () => {
    if(props.myPostsMode) {
      return props.posts.map(({ id, body, comments, createdAt, createdBy })=>{
        const myName = `${createdBy.fname} ${createdBy.lname}`
        const linkUrl = createdBy.avatar.length  ? createdBy.avatar[0].url : imgAvatar
        return <Post key={id} linkUrl={linkUrl} myPostsMode={true} avatarUrl={linkUrl} body={body} name={myName} comments={comments} createdAt={createdAt} id={id} createdBy={createdBy} />
      })
    } else if (props.feedMode) {
      return props.feed.map(({ id, body, comments, createdAt, createdBy })=>{
        const myName = `${createdBy.fname} ${createdBy.lname}`
        const { avatar } = createdBy
        const linkUrl = avatar && avatar.length > 0 ? avatar[0].url : null
        return <Post key={`${id}-feed`} linkUrl={linkUrl} feedMode={true} avatarUrl={linkUrl} body={body} name={myName} comments={comments} createdAt={createdAt} id={id} createdBy={createdBy} />
      })
    } else if(props.profileMode) {
      return props.profilePosts.map(({ id, body, comments, createdAt, createdBy })=>{
        const myName = `${createdBy.fname} ${createdBy.lname}`
        const { avatar } = createdBy
        const linkUrl = avatar.length ? avatar[0].url : null
        return <Post key={`${id}-profile`} profileMode={true} linkUrl={linkUrl} body={body} name={myName} comments={comments} createdAt={createdAt} id={id} createdBy={createdBy} />
      })
    }
  }
    return ( 
      <Fragment> 
      {(props.posts && props.myPostsMode || props.feed || props.profileMode) && renderQuery()}
      </Fragment>
        
    )
  }

function mapStateToProps({ posts, feed, profilePosts }) {

  return { posts, feed, profilePosts }
}

export default connect(mapStateToProps)(Posts)


