import React from 'react'
import {
  Col, Row, Input, Card, CardSubtitle, Button, CardBody
} from 'reactstrap'

import {
  elevation,
  transition
} from '../Utils'

import styled from 'styled-components'

export default function WisdomForm() {
  return (
    <div>
      <Row>
        <Col sm={12}>
          <div>
            <StyledCard>
              <CardBody>
                <CardSubtitle className="mb-1">Share Your Wisdom</CardSubtitle>
                <Input className="mb-2" type="textarea" name="text" id="exampleText" />
                <Button>Button</Button>
                <Button className="mr-auto">Button</Button>
              </CardBody>
            </StyledCard>
          </div>
        </Col>
      </Row>
    </div>
  )
}


const StyledCard = styled(Card)`
${elevation[3]}
margin: .6rem;
margin-bottom: 1rem;
${transition({
            property: 'box-shadow'
      })};
      &:hover {
            ${elevation[4]};
      }
` 