import React, { Fragment, useState } from 'react'
import {
  Col, Row, Card, CardTitle, CardSubtitle, CardText, Button, CardBody
} from 'reactstrap'
import styled from 'styled-components'
import { Comments, AddCommentForm } from '../Components'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SmallProfileImg } from '.'
import { black, elevation, transition } from '../Utils'
import Avatar from '../../assets/new_logo.png'
const imgAvatar = Avatar.replace('build', '').replace('/public', '')

export default function Wisdom(props) {
  const [ showForm, setShowForm ] = useState(false)
  const [ showComments, setShowComments ] = useState(false)
  const openForm = () => {
    setShowForm(!showForm)
  }
  const toggleComments = () => {
    setShowComments(!showComments)
  }
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
              <CreatedAt className="ml-0 pl-0">{props.createdAt}</CreatedAt>
            </div>
          </div>
          <CardText className="mb-4 text-left">
            {props.body}
          </CardText>
          <div className="d-flex">
            <Button onClick={toggleComments}>{props.comments ? props.comments.length : '0'} Comments</Button>
            <div className="ml-auto" >
              <Button onClick={openForm} className="ml-2">{showForm ? 'Changed My Mind' : 'Comment'}</Button>
              <Button className="ml-2"><i className="fas fa-heart"></i> 0 Likes</Button>
            </div>
          </div>
        </CardBody>
        {showForm && <AddCommentForm openForm={openForm} />}
      </StyledCard>
      
      {showComments &&  <Comments comments={props.comments} />}
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
