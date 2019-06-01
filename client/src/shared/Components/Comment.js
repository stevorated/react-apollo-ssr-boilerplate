import React from 'react'
import { FlatCard, SmallProfileImg } from '../Elements'
import {
  Col, Row, Card, CardTitle, CardSubtitle, CardText, Button, CardBody
} from 'reactstrap'
import styled from 'styled-components'
import Avatar from '../../assets/new_logo.png'
const imgAvatar = Avatar.replace('build', '').replace('/public', '')

export default function Comment({ id, body, createdAt, name }) {
  return (
    <FlatCard className="bg-white" >
      <div className="d-flex">
        <SmallProfileImg
          className="mr-3"
          src={imgAvatar}
          alt="my profile img" />
        <div>
          <CardTitle className="mb-0 text-capitalize">{name}</CardTitle>
          <CreatedAt className="ml-0 pl-0">{createdAt}</CreatedAt>
        </div>
      </div>
      <div className="text-left ml-2">{body}</div>
    </FlatCard>
  )
}

const CreatedAt = styled.p`
font-size: .6rem;
text-align: left;
`
