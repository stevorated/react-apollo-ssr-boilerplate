import React from 'react'
import {
  Col, Row, Card, CardTitle, CardSubtitle, CardText, Button, CardBody
} from 'reactstrap'
import styled from 'styled-components'
import { SmallProfileImg } from '.'
import {black, elevation, transition} from '../Utils'
import Avatar from '../../assets/new_logo.png'
const imgAvatar = Avatar.replace('build','').replace('/public','')

export default function Wisdom() {
  return (
          <StyledCard>
            <CardBody>
              <div className="d-flex">
                <SmallProfileImg
                  className="mr-3"
                  src={imgAvatar}
                  alt="Card image cap" />
                <div>
                  <CardTitle className="mb-0">Poster Name</CardTitle>
                  <CreatedAt className="ml-0 pl-0">CreateAt</CreatedAt>
                </div>
              </div>
              <CardText className="mb-4">
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </CardText>
              <div className="d-flex">
                <Button>0 Comments</Button>
                <div className="ml-auto" >
                  <Button className="ml-2">Comment</Button>
                  <Button className="ml-2">Like</Button>
                </div>
              </div>
            </CardBody>
          </StyledCard>
  )
}

const CreatedAt = styled.p`
font-size: .6rem;
text-align: left;
`

const StyledCard = styled(Card) `
      color: ${black};
      border-radius: .3rem;
      margin: .6rem;
      margin-bottom: .9rem;
      ${elevation[3]};
      transition: all 3s ease;
      ${transition({
            property: 'box-shadow'
      })};
      &:hover {
            ${elevation[4]};
      }
`
