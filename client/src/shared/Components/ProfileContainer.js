import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { BigProfileImg, FlatCard } from '../Elements'
import Avatar from '../../assets/new_logo.png'
const imgAvatar = Avatar.replace('build', '').replace('/public', '')

function ProfileContainer({ auth }) {
  const { fname, lname, email, username } = auth
  return (
    <div className=" p-2" >
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
        </Fragment>
      }
    </div>
  )
}
const mapStateToProps = ({ auth }) => ({ auth })
export default connect(mapStateToProps)(ProfileContainer)