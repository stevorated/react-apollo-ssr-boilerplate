import React from 'react'
import { FlatCard, Card, MenuCard } from '../../Elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faAirFreshener, faAddressBook, faAmericanSignLanguageInterpreting, faAmbulance } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { black, white } from '../../Utils'

export default function FeedMenu() {
  return (
    <MenuCard>
      <h3 className="header-4 mt-2">Menu</h3>
      <hr className="lead mb-3"  style={{color: 'white', borderWidth: '2px', borderColor: 'white'}}/>
      <StyledList className="p-0 m-0">
        <StyledListItem className="text-left">
          <FontAwesomeIcon className="mr-1" icon={faSearch} />Profile
        </StyledListItem>
        <StyledListItem className="text-left">
          <FontAwesomeIcon className="mr-1" icon={faSearch} />Event Board
        </StyledListItem>
        <StyledListItem className="text-left">
          <FontAwesomeIcon className="mr-1" icon={faSearch} />Feed
        </StyledListItem>
        <StyledListItem className="text-left">
          <FontAwesomeIcon className="mr-1" icon={faSearch} />Settings
        </StyledListItem>
        <StyledListItem className="text-left">
          <FontAwesomeIcon className="mr-1" icon={faSearch} />Following
        </StyledListItem>
        <StyledListItem className="text-left">
          <FontAwesomeIcon className="mr-1" icon={faSearch} />Followers
        </StyledListItem>
      </StyledList>
      <hr style={{color: 'white', borderWidth: '2px', borderColor: 'white'}}/>
      <StyledList className="p-0 m-0">
        <StyledListItem className="text-left">
        <FontAwesomeIcon className="mx-1" icon={faSearch} />Logout
      </StyledListItem>
    </StyledList>
    </MenuCard>
  )
}

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
`

const StyledListItem = styled.li`
  list-style: none;
  margin: .5rem .2rem .2rem 0rem ;
  padding: .2rem;
  transition: all .5s ease;
  &:hover {
    background: antiquewhite;
    color: black;
  }
`
