import React, { useState }  from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from 'reactstrap'

function Footer () {
  const [collapsed, toggleNavbar] = useState(false)
  return (
    <div>
      <Navbar color="dark" dark expand="md" fixed="bottom">
        <NavbarBrand href="/">Wisdom Of De Crowd</NavbarBrand>
      </Navbar>
    </div>
  )
  }

  export default Footer