import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { BigProfileImg, FlatCard } from '../../Elements'
import Avatar from '../../../assets/new_logo.png'
const imgAvatar = Avatar.replace('build', '').replace('/public', '')

function ProfileContainer({ auth }) {
  const { fname, lname, email, username } = auth
  return (
    <div className="m-0 mt-2" >
      {auth &&
        <FlatCard className="m-0 p-0">
          <BigProfileImg
            className="text-center my-4"
            src={imgAvatar}
            alt=""
          />
          <p className="text-capitalize">{fname} {lname}</p>
          <p className="mb-5 pb-5">{username}</p>
        </FlatCard>
      }
    </div>
  )
}
const mapStateToProps = ({ auth }) => ({ auth })
export default connect(mapStateToProps)(ProfileContainer)