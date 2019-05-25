import React from 'react'
import { Spinner } from 'reactstrap'

export default function Loading() {
  return (
    <div style={{margin: '12rem'}}>
      <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
    </div>
  )
}
