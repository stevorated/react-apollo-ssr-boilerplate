import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import { Card } from '../Elements'
import { BigProfileImg, FlatCard } from '../Elements'

import Avatar from '../../assets/new_logo.png'
const imgAvatar = Avatar.replace('build','').replace('/public','')

function ProfileContainer({ auth }) {
  const { fname, lname, email, username } = auth
  return (
    <Card>
    {auth && 
      <Fragment>
      <FlatCard>
        <BigProfileImg
        className="my-4" 
        src={imgAvatar} 
        alt=""
        />
        <p>{username}</p>
        <p>{fname}</p>
        <p>{lname}</p>
        <p>{email}</p>
      </FlatCard>
      <FlatCard className="m-1">
        <p>somthing</p>
        <p>another thing</p>
        <p>Wisdoms</p>
        <p>Info</p>
        
      </FlatCard>
      </Fragment>
    }
      </Card>
  )
}
const mapStateToProps = ({ auth }) => ({ auth })
export default connect(mapStateToProps)(ProfileContainer)