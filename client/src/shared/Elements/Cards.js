import styled from 'styled-components'
import {
  elevation,
  transition,
  black
} from '../Utils'

export const Card = styled.div `
      color: ${black};
      background: white;
      border-radius: .3rem;
      padding: 0;
      margin-bottom: 1rem;
      ${elevation[3]};
      transition: all 3s ease;
      ${transition({
            property: 'box-shadow'
      })};
      &:hover {
            ${elevation[4]};
      }
`

export const FlatCard = styled.div `
      color: ${black};
      border-radius: .3rem;
      padding: 0.5rem;
      margin-bottom: .3rem;
      ${elevation[1]};
      transition: all 3s ease;
      ${transition({
            property: 'box-shadow'
      })};
      &:hover {
            ${elevation[2]};
      }
`

