import React, {useState} from 'react'
import { HelmetComponent } from '../Components'
import { Container } from 'reactstrap'
import { elevationJs } from '../Utils'
import styled from 'styled-components'

function PublicPage() {
  const [btnText, setBtnText] = useState('CLICK ME')
  const [counter, setCounter] = useState(0)
  const title = "Public Page"
  const handleClick = () => {

    if(counter === 0) {
      setBtnText('AND AGAIN')
      setCounter(1)
    }
    if(counter === 1) {
      setBtnText('ONE MORE TIME')
      setCounter(2)
    }
    if(counter === 2) {
      setBtnText('DONT OVER DO IT...')
      setCounter(3)
    }
    if(counter === 3) {
      setBtnText('CLICK ME')
      setCounter(0)
    }
  }
  return (
    <Container>
      <HelmetComponent pageTitle={title} ogTitle={title} />
      <h1>Public Page</h1>
      <button
      style={elevationJs[3]}
      onClick={handleClick}
      className="big-btn"
      >
      {btnText}
      </button>
    </Container>
  )
}

export default {
  component: PublicPage
}
