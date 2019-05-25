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
        <HelmetComponent pageTitle="admins" ogTitle="admins" />
        <h1>Protected list</h1>
        <h6>{this.props.auth.id}</h6>
        
        <div>
          {this.renderQuery()}
        </div>    
      </Container>
    )
  }
}

function mapStateToProps({ users, auth }) {
  return { users, auth }
}

export default {
  component: connect(mapStateToProps, {fetchUsers})(requireAuth(PrivatePage)),
  loadData: ({ dispatch }) => dispatch(fetchUsers())
}