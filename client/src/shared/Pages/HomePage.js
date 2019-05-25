import React, {useState} from 'react'
import { HelmetComponent } from '../Components'
import { Container } from 'reactstrap'

function HomePage() {
  const [btnText, setBtnText] = useState('CLICK ME')
  const [counter, setCounter] = useState(0)

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
      <HelmetComponent pageTitle="Home" ogTitle="Home" />
      <h1>HomePage</h1>
      <button 
      onClick={handleClick}
      className="big-btn"
      >
      {btnText}
      </button>
    </Container>
  )
}

export default {
  component: HomePage
}