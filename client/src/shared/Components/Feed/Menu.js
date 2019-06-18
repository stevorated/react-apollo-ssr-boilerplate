import React from 'react'
import { Container, Col, Row } from 'reactstrap'
import { FlatCard, Card, MenuCard } from '../../Elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faAirFreshener,
  faAddressBook,
  faAmericanSignLanguageInterpreting,
  faAmbulance,
  faMale,
  faHome,
  faAnchor,
  faScrewdriver
}
  from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import MenuItem from './MenuItem'
import { black, white } from '../../Utils'

export default function Menu() {
  return (
    <MenuCard>
      <h3 className="header-4 mt-2">Menu</h3>
      <hr className="lead mb-3" style={{ color: 'white', borderWidth: '2px', borderColor: 'white' }} />
      <Container >
        <Row>
          <Col lg={12} xs={6}>
            <StyledList className="p-0 m-0">
              <MenuItem icon={faHome} text="Profile" />
              <MenuItem icon={faAnchor} text="Event Board" />
              <MenuItem icon={faAddressBook} text="Feed" />
              <MenuItem icon={faAmbulance} text="Logout" />
            </StyledList>
          </Col>
          <Col lg={12} xs={6}>
            <StyledList className="p-0 m-0">
              <MenuItem icon={faAmbulance} text="Settings" />
              <MenuItem icon={faScrewdriver} text="Prefs" />
              <MenuItem icon={faAmericanSignLanguageInterpreting} text="Follows" />
              <MenuItem icon={faAirFreshener} text="Followers" />
            </StyledList>
          </Col>
        </Row>
      </Container>
      <hr style={{ color: 'white', borderWidth: '2px', borderColor: 'white' }} />
    </MenuCard>
  )
}

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
`

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
