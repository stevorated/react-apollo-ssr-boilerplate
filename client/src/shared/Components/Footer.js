import React, { useState }  from 'react'
import { Navbar } from 'reactstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function Footer () {
  const [collapsed, toggleNavbar] = useState(false)
  return (
    <FooterDiv>
      <Navbar color="dark" dark fixed="bottom">
        <Link 
        className="nav-link text-white" 
        to="/">Wisdom Of De Crowd&copy;
        </Link>
      </Navbar>
    </FooterDiv>
  )
  }

export default Footer
const FooterDiv = styled.div`
  opacity:0.6;
`
const StyledLink = styled(Link)`
opacity:0.6;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
font-size: 0.9rem;
padding: 0;
`