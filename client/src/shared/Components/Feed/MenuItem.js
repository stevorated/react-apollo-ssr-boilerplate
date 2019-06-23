import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { black } from '../../Utils'


function MenuItem({ icon, text, to = "/", handleLogout }) {
  const handleClick = to === '/logout' ? handleLogout : () => { }
  return (
  <StyledListItem className="text-center pl-3">
    <StyledNavLink to={to} onClick={handleClick} className="text-left py-1">
      <FontAwesomeIcon className="mx-3" icon={icon} />{text}
    </StyledNavLink>
  </StyledListItem>
  )
}

export default connect()(MenuItem)

const StyledListItem = styled.li`
  cursor: pointer;
  list-style: none;
  display: block;
  margin: .5rem .2rem .2rem 0rem ;
  transition: all .5s ease;
  &:hover {
    background: antiquewhite;
    color: black;
  }
`

const StyledNavLink = styled(NavLink)`
  color: white;
  display: block;
  &:active {
    text-decoration: none;
  }
  &:hover {
    text-decoration: none;
    color: ${black}
  }
  
`