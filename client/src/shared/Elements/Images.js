import { elevation } from '../Utils'
import styled from 'styled-components'

export const BigProfileImg = styled.img`
${elevation[1]};
filter: grayscale(20%);
opacity: .8;
width: 4rem;
height: 4rem;
border-radius: 50%;
transition: all .4s ease;
&:hover {
  ${elevation[3]};
  opacity: 1;
  filter: none;
}
`


export const SmallProfileImg = styled.img`
${elevation[1]};
background: green;  
opacity: 1;
width: 2.4rem;
height: 2.4rem;
border-radius: 50%;
transition: all .4s ease;
&:hover {
  ${elevation[3]};
  opacity: .5;
}
`

