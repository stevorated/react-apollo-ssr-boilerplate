import React, { Fragment, useState } from 'react'
import { Button, Card } from 'reactstrap'
import Comment from './Comment'
import AddCommentContainer from './AddCommentContainer'
import { Link, NavLink } from 'react-router-dom'

export default function Comments(props) {
  const { comments, id } = props
  const [ showForm, setShowForm ] = useState(false)
  const [ showComments, setShowComments ] = useState(false)
  const openForm = () => {
    setShowForm(!showForm)
  }

  const toggleComments = () => {
    setShowComments(!showComments)
  }

  const renderQuery = () => {
    return comments.map(({ id, body, createdBy, createdAt })=>{
      const commentID = id
      const name = `${createdBy.fname} ${createdBy.lname}`
      return <Comment key={commentID} body={body} createdAt={createdAt} name={name} />
    })

  }
  return (
    <div  className="mx-2" style={{opacity: '0.8'}}>
      {renderQuery()}
      <Link to="#" onClick={openForm} className="ml-2">{showForm ? 'Hide' : 'Comment'}</Link>
      {showForm && <Card className="pt-3 mt-3" >
      <AddCommentContainer 
      id={id} 
      openForm={openForm} 
      setShowComments={setShowComments} 
      commentCount = {comments.length}
      />
      </Card>}
    </div>
  )
}