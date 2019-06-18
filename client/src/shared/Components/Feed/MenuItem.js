import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

export default function MenuItem({icon, text}) {
  return (
    <StyledListItem className=" text-left ml-sm-2">
      <FontAwesomeIcon className="mx-3" icon={icon} />
      {text}
    </StyledListItem>
  )
}

const StyledListItem = styled.li`
  cursor: pointer;
  list-style: none;
  margin: .5rem .2rem .2rem 0rem ;
  padding: .2rem;
  transition: all .5s ease;
  &:hover {
    background: antiquewhite;
    color: black;
  }
`