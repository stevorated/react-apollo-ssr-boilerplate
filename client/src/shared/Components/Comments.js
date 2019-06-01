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
      const name = `${createdBy.fname} ${createdBy.lname}`
      return <Comment key={id} body={body} createdAt={createdAt} name={name} />
    })

  }
  return (
    <div  className="mx-2" style={{opacity: '0.8'}}>
      {renderQuery()}
      <Button onClick={openForm} className="ml-2">{showForm ? 'Changed My Mind' : 'Comment'}</Button>
      {showForm && <Card className="pt-3 mt-3" ><AddCommentContainer id={id} openForm={openForm} /></Card>}
    </div>
  )
}