import { Component } from 'react'
import reactDOM from 'react-dom'

const portalRoot = document.getElementById('portal')

export default class Portal extends Component {

  constructor() {
    super ()
    this.el = document.createElement('div')
  }

  componentDidMount = () => {
    portalRoot.append(this.el)    
  }

  componentWillUnmount() {
    portalRoot.remove(this.el)
  }

  render() {
    const { children } = this.props
    return reactDOM.createPortal(children, this.el)
  }
}
