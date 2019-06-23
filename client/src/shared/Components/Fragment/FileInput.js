import React, { useCallback, useState, } from 'react'
import { connect } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { uploadFile } from '../../Store/actions'
import { Image } from 'reactstrap'
import styled from 'styled-components'
import { black } from '../../Utils'

function FileInput(props) {
  const onDrop = useCallback(async (acceptedFiles) => {
    props.setValid(false)
    const preview = document.getElementById('backFromServer')
    const previewLabel = document.getElementById('preview-label')
    const uploadSuccessSpan = document.getElementById('upload-success-span')
    const rawFile = acceptedFiles[0]
    // CREATE ALLOWED ARRAY
    const allowed = () => {
      switch (props.uploadType) {
        case 'avatar':
          return ['jpg', 'jpeg', 'png']
        default:
          break
      }
    }
    const { size, name } = rawFile
    const sizeString = `${size.toString()} Kb`
    const type = name.split('.').pop()
    // INIT
    previewLabel.innerHTML = ''
    preview.src = undefined
    uploadSuccessSpan.innerHTML = ''
    // CHOOSE VALIDATION TYPE
    switch (props.uploadType) {
      case 'avatar':
        if (!allowed().includes(type)) {
          previewLabel.innerHTML = `only files of type ${allowed().join(', ')} are allowed`
        } else if (size > props.limit) {
          previewLabel.innerHTML = 'File To Big'
        } else {
          uploadSuccessSpan.innerHTML = `Preview for you, you like? click to confirm`
          props.setFileData({ file: rawFile, size: sizeString })
          preview.src = URL.createObjectURL(rawFile)
          props.setValid(true)
        }
        break
      default:
        break
    }
  }, [])
  // DROPZONE HOOK
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <div className="text-center">
      <div {...getRootProps()} className="" style={{ cursor: 'pointer'}}>
        <input {...getInputProps()} />
        {props.valid &&
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
        
        <label id="preview-label" htmlFor="preview"></label>
        <PreviewBox className="m-auto">
          <img style={{borderRadius: '100%'}} width="200px" width="300px" height="300px" className="img" id="backFromServer" alt="" />
        </PreviewBox>
        <p id="upload-success-span"></p>
      </div>
    </div>

  )
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps, { uploadFile })(FileInput)

const PreviewBox = styled.div`
border-radius: 100%;
width: 310px;
height: 310px;
border: 2px solid ${black}
`