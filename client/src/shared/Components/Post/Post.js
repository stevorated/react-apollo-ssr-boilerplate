import React, { Fragment, useState, useEffect  } from 'react'
import { Link } from 'react-router-dom'
import {
  Col, Row, Card, CardTitle, CardSubtitle, CardText, Button, CardBody
} from 'reactstrap'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeer } from '@fortawesome/free-solid-svg-icons'
import { Comments, AddCommentForm, AddCommentContainer, DeletePostMutation } from './'
import { SmallProfileImg } from '../../Elements'
import { black, elevation, transition, timeAgo } from '../../Utils'
import Avatar from '../../../assets/new_logo.png'
const imgAvatar = Avatar.replace('build', '').replace('/public', '')

export default function Post(props) {
  const [ showForm, setShowForm ] = useState(false)
  const [ showComments, setShowComments ] = useState(false)
  const [ hideDeletedComment, setHideDeletedComment ] = useState(false)
  const [ clickDeleteCounter, setClickDeleteCounter ] = useState(0)
  const [ deleteMessage, setDeleteMessage ] = useState('')

  const openForm = () => {
    setShowForm(!showForm)
  }
  const toggleComments = () => {
    setShowComments(!showComments)
  }
  
  const handleDelete = () => {
    if(clickDeleteCounter === 0) {
      setDeleteMessage('You Sure? click twice')
    }
    if(clickDeleteCounter === 1) {
      setDeleteMessage('final warning ... u sure?')
    }
    if(clickDeleteCounter === 2) {
      setHideDeletedComment(true)
    }
  }

  useEffect(()=>{
  })
  
  const animatedClass = hideDeletedComment ? 'animated flipOutY' : 'animated fadeIn slow'
  const PostedTime = timeAgo(Date.now(),props.createdAt)
  return !hideDeletedComment ? (
    <div className={`mb-3 ${animatedClass}`}>
      <StyledCard  >
        <CardBody>
          <DeletePostMutation 
          handleDelete={handleDelete}
          hideDeletedComment={hideDeletedComment}
          post={props.id} 
          deleteMessage={deleteMessage} 
          clickDeleteCounter={clickDeleteCounter} 
          setClickDeleteCounter={setClickDeleteCounter}
          close />
          <div className="d-flex">
            <SmallProfileImg
              className="mr-3"
              src={imgAvatar}
              alt="my profile img" />
            <div>
              <CardTitle className="mb-0 text-capitalize">{props.name}</CardTitle>
              <CreatedAt className="ml-0 pl-0">{PostedTime}</CreatedAt>
            </div>
          </div>
          <CardText className="mb-4 text-left">
            {props.body}
          </CardText>
          <div className="d-flex">
            <Button style={{padding: '0.3rem'}} onClick={props.comments.length >0 ? toggleComments : (()=>{})}>{props.comments ? props.comments.length : '0'} Comments</Button>
            
            <div className="ml-auto" >
              <Button className="ml-2">
              0 Likes 
              <FontAwesomeIcon icon={faBeer} className="ml-2 text-warning" />
              </Button>
            </div>
          </div>
        </CardBody>
        {showForm && 
          <AddCommentContainer
          commentCount={props.comments.length}
          setShowComments={setShowComments}
          setShowForm={setShowForm}
          feedMode={props.feedMode} 
          myPostsMode={props.myPostsMode} 
          id={props.id} 
          openForm={openForm} />}
      </StyledCard>
      {!showComments && 
        <Link 
        to="#" 
        onClick={openForm} 
        className="ml-2">
        {showForm ? 'Hide' : 'Comment'}
        </Link>}
      {showComments &&  
        <Comments 
        feedMode={props.feedMode} 
        myPostsMode={props.myPostsMode}  
        comments={props.comments} 
        id={props.id} 
        />}
    </div>
  ) : (
    <span className="animated fadeOut turtle">Done, Hope Your're Happy ..</span>
  )
}



const CreatedAt = styled.p`
font-size: .6rem;
text-align: left;
`
const StyledCard = styled(Card)`
      color: ${black};
      background: whitesmoke;
      opacity: .9;
      border-radius: .3rem;
      margin: .6rem;
      ${elevation[3]};
      transition: all 3s ease;
      ${transition({
  property: 'box-shadow'
})};
      &:hover {
            ${elevation[4]};
      }
`
const StyledCardBody = styled(CardBody)`
  transition: all 1s ease;
`