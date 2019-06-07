import React, { Fragment, useState } from 'react'
import {
  Col, Row, Card, CardTitle, CardSubtitle, CardText, Button, CardBody
} from 'reactstrap'
import styled from 'styled-components'
import { Comments, AddCommentForm, AddCommentContainer } from '../Components'
import { SmallProfileImg } from '.'
import { black, elevation, transition, timeAgo } from '../Utils'
import Avatar from '../../assets/new_logo.png'
import moment from 'moment'
const imgAvatar = Avatar.replace('build', '').replace('/public', '')

export default function Post(props) {
  
  const [ showForm, setShowForm ] = useState(false)
  const [ showComments, setShowComments ] = useState(false)
  const openForm = () => {
    setShowForm(!showForm)
  }
  const toggleComments = () => {
    setShowComments(!showComments)
  }

  const PostedTime = timeAgo(Date.now(),props.createdAt)
  return (
    <div className="mb-5">
      <StyledCard >
        <CardBody>
          <Button close />
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
            <Button onClick={toggleComments}>{props.comments ? props.comments.length : '0'} Comments</Button>
            <Button onClick={openForm} className="ml-2">{showForm ? 'Hide' : 'Comment'}</Button>
            <div className="ml-auto" >
              <Button className="ml-2"><i className="fas fa-heart"></i> 0 Likes</Button>
            </div>
          </div>
        </CardBody>
        {showForm && <AddCommentContainer id={props.id} openForm={openForm} />}
      </StyledCard>
      
      {showComments &&  <Comments comments={props.comments} id={props.id} />}
    </div>
  )
}

const CreatedAt = styled.p`
font-size: .6rem;
text-align: left;
`

const StyledCard = styled(Card)`
      color: ${black};
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
