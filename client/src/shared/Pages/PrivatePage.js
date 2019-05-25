import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../Store/actions'
import { HelmetComponent} from '../Components'
import requireAuth from '../HOC/requireAuth'
import { Container } from 'reactstrap'

class PrivatePage extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }
  renderQuery() {
    return this.props.users.map(({ id, fname, lname})=>{
      return <h4 key={id}>{lname} {fname}</h4>
    })
  }
  render() {
    return (
      <Container>
        <HelmetComponent pageTitle="private-page" ogTitle="private-page" /> 
        <h1>private page</h1> 
      </Container>
    )
  }
}

function mapStateToProps({ users }) {
  return { users }
}

export default {
  component: connect(mapStateToProps, {fetchUsers})(requireAuth(PrivatePage)),
  loadData: ({ dispatch }) => dispatch(fetchUsers())
}