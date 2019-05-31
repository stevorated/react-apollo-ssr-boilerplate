import React, { Fragment } from 'react'
import {
  Container
} from 'reactstrap'
import { WisdomForm } from '../Elements'
import Wisdoms from './Wisdoms'
import styled from 'styled-components'

export default function ScrollContainer() {
  return (
    <StyledDiv style={{marginBottom: '20rem'}}>
      <WisdomForm />
      <Wisdoms />
    </StyledDiv>
  )
}

const StyledDiv = styled.div `
  margin: 0;
  padding: 0;
`