import React, { Fragment } from 'react'
import { Container } from 'reactstrap'
import { PostFormContainer } from './Post'
import { Posts } from './Post'
import styled from 'styled-components'
import { QueryMorePosts } from './Post'

function ScrollContainer() {
  return (
    <StyledDiv>
      <PostFormContainer />
      <Posts />
      <QueryMorePosts />
    </StyledDiv>
  )
}

const StyledDiv = styled.div `
  margin: 0;
  padding: 0;
  margin-bottom: 20rem;
`

export default ScrollContainer