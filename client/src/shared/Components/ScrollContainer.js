import React, { Fragment } from 'react'
import { Container } from 'reactstrap'
import { WisdomFormContainer } from './Post'
import { Wisdoms } from './Post'
import styled from 'styled-components'

function ScrollContainer() {
  return (
    <StyledDiv>
      <WisdomFormContainer />
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