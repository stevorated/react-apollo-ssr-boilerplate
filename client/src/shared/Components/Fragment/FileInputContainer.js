import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import FileInput from './FileInput'
import { connect } from 'react-redux'
import { uploadFile } from '../../Store/actions'

function FileInputContainer(props) {
  const [valid, setValid] = useState(false)
  const [fileData, setFileData] = useState({})
  const handleSubmitAvatar = (e) => {
    e.preventDefault()
    if (valid) {
      
      props.uploadFile(fileData)
      setValid(false)
      
      const preview = document.getElementById('backFromServer')
      const previewLabel = document.getElementById('preview-label')
      const uploadSuccessSpan = document.getElementById('upload-success-span')

      previewLabel.innerHTML = ''
      preview.src = undefined
      uploadSuccessSpan.innerHTML = ''
      
      props.toggle()

    } else {
      setValid(false)
    }

  }
  return (
    <Container >
      <form onSubmit={handleSubmitAvatar}>
        <FileInput className="" {...props} valid={valid} setValid={setValid} setFileData={setFileData} />
        <Button className="mt-2" disabled={!valid}>Confirm Upload</Button>
      </form>
    </Container>
  )
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps, { uploadFile })(FileInputContainer)