import React from 'react'
import Comment from './Comment'

export default function Comments({comments}) {
  const renderQuery = () => {
    return comments.map(({ id, body, createdBy, createdAt })=>{
      const name = `${createdBy.fname} ${createdBy.lname}`
      return <Comment key={id} body={body} createdAt={createdAt} name={name} />
    })
  }
  return (
    <div  className="mx-2" style={{opacity: '0.8'}}>
      {renderQuery()}
    </div>
  )
}
