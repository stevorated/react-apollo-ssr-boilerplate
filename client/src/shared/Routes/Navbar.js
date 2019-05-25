import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { elevation } from '../Utils'
import { logoutUser } from '../Store/actions'

function NavbarHeader ({auth, logoutUser}) {
  const [collapsed, toggleNavbar] = useState(false)
  const handleToggleNav = () =>toggleNavbar(!collapsed)
  const handleClick = () => {
    if(collapsed===true) {
      toggleNavbar(!collapsed)
    }
  }
  const handleLogout = async () => {
    const res = await logoutUser()
      if(collapsed===true) {
        toggleNavbar(!collapsed)
      }
  }
  const authBtn = auth ? (
    <NavLink className='nav-link' to="/login" onClick={handleLogout}>Logout</NavLink>
  ) : (
    <NavLink className='nav-link' to="/login" onClick={handleClick}  >Login</NavLink>
  )
  return (
      <StyledNavbar color="dark" dark expand="md" fixed="top">
        <HeaderLink 
        className="text-white" 
        onClick={handleClick}
        to="/">Wisdom Of De Crowd
        </HeaderLink>
        <NavbarToggler
        onClick={handleToggleNav} 
        />
        <Collapse isOpen={collapsed} navbar>
          <Nav navbar>
          </Nav>
          <Nav className="ml-auto pr-4" navbar>
            <NavItem>
              <NavLink 
              className='nav-link' 
              onClick={handleClick}  
              to='/admins'
              >
              Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink 
              className='nav-link' 
              onClick={handleClick} 
              to='/blabla'
              >
              404
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink 
              className='nav-link' 
              onClick={handleClick}  
              to='/test'
              >
              test
              </NavLink>
            </NavItem>
            <NavItem>
              {authBtn}
            </NavItem>
          </Nav>
        </Collapse>
      </StyledNavbar>
  )
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps, {logoutUser})(NavbarHeader)

const StyledNavbar = styled(Navbar)`
  ${elevation[4]};
  `

const HeaderLink = styled(NavLink)`
  &:hover {
    text-decoration: none;
  }
  &:active {
    text-decoration: none;
  }
`

// <Switch>
// {routes.map(route => <Route key={route.name} {...route} />)}
// </Switch>

