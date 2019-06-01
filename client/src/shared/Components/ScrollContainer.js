import React, { Fragment } from 'react'
import { Container } from 'reactstrap'
import { WisdomForm } from '../Elements'
import Wisdoms from './Wisdoms'
import styled from 'styled-components'

function ScrollContainer() {
  return (
    <StyledDiv>
      <WisdomForm />
      <Wisdoms />
    </StyledDiv>
  )
}

const StyledDiv = styled.div `
  margin: 0;
  padding: 0;
  margin-bottom: 20rem;
`

export default ScrollContainer