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
    <div className="my-4 p-2" >
    {auth && 
      <Fragment>
      <FlatCard>
        <BigProfileImg
        className="text-center mt-2"
        src={imgAvatar} 
        alt=""
        />
        <p className="text-capitalize">{fname} {lname}</p>
        <p className="mt-5">{username}</p>
        <p className="">{email}</p>
      </FlatCard>
      <FlatCard className="m-1">
        <p>somthing</p>
        <p>another thing</p>
        <p>Wisdoms</p>
        <p>Info</p>
        
      </FlatCard>
      </Fragment>
    }
      </div>
  )
}
const mapStateToProps = ({ auth }) => ({ auth })
export default connect(mapStateToProps)(ProfileContainer)