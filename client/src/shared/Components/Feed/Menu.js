import React from 'react'
import { connect } from 'react-redux'
import { Container, Col, Row } from 'reactstrap'
import { MenuCard } from '../../Elements'
import { mediaQs } from '../../Utils'
import { logoutUser } from '../../Store/actions'
import {
  faCalendarAlt,
  faSearch,
  faAirFreshener,
  faAddressBook,
  faUserAlt,
  faAmericanSignLanguageInterpreting,
  faAmbulance,
  faWrench,
  faMale,
  faHome,
  faAnchor,
  faScrewdriver
} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import MenuItem from './MenuItem'
// import { black, white, elevation } from '../../Utils'

function Menu({ logoutUser }) {
  const handleLogout = async () => {
    await logoutUser()
  }
  return (
    <MenuCard className="text-center">
      <h3 className="header-4 mt-3 py-1">Menu</h3>
      <hr className="lead mb-3" style={{ color: 'white', borderWidth: '2px', borderColor: 'white' }} />
      <Container>
        <Row >
          <Col lg={12} xs={6} className="p-0">
            <StyledList className="p-0 m-0 pb-2">
              <MenuItem icon={faHome} text="Home" to="/" />
              <MenuItem icon={faUserAlt} text="Profile" to="/my-profile"/>
              <MenuItem icon={faAnchor} text="Event Board" to="/myevents" />
              <MenuItem icon={faAmericanSignLanguageInterpreting} text="Event Feed" to="/board"/>
            </StyledList>
          </Col>
          <Col lg={12} xs={6} className="p-0 pb-2">
            <StyledList className="p-0 m-0">
              <MenuItem icon={faAirFreshener} text="Privacy" to="/privacy" />
              <MenuItem icon={faScrewdriver} text="Prefs" to="/preferences" />
              <MenuItem icon={faWrench} text="Settings" to="/settings" />
              <MenuItem icon={faCalendarAlt} text="Calander" to="/calander" />
            </StyledList>
          </Col>
        </Row>
      </Container>
      
    </MenuCard>
  )
}

const StyledList = styled.ul`
  display: block;
`

export default connect(undefined, { logoutUser })(Menu)

// <hr style={{ color: 'white', borderWidth: '2px', borderColor: 'white' }} />

// <MenuItem icon={faAmbulance} text="Logout" to="/logout" handleLogout={handleLogout} />