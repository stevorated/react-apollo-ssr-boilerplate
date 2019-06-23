import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { fetchUsers } from '../Store/actions'
import { HelmetComponent} from '../Components'
import requireAuth from '../HOC/requireAuth'
import { Container } from 'reactstrap'
import FileInputContainer from '../Components/Fragment/FileInputContainer'

class TestPage extends Component {
  
  constructor(props) {
    super(props)
  }


  componentDidMount() {
    this.props.fetchUsers()
  }

  renderQuery() {
    return this.props.users.map(({ id, fname, lname, username})=>{
      return <h4 key={id}>{fname} {lname} {username}</h4>
    })
  }

  render() {
    return (
      <Container className="p-4 text-center">
        <HelmetComponent pageTitle="admins" ogTitle="admins" />
        <FileInputContainer limit="2000000" uploadType="avatar" />
        <h1>Protected list</h1>
        <h6>{this.props.auth.id}</h6>
        {this.renderQuery()} 
      </Container>
    )
  }
}

function mapStateToProps({ users, auth }) {
  return { users, auth }
}

export default {
  component: connect(mapStateToProps, {fetchUsers})(requireAuth(TestPage)),
  loadData: ({ dispatch }) => dispatch(fetchUsers())
}


