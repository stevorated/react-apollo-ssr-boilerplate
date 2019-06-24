import { File, User } from '../models'
import { uploadAvatar } from '../joiSchemas'
import Joi from '@hapi/joi'

// import path from 'path'
import { createWriteStream } from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
const { ASSETS_DIR, AVATARS_DIR } = process.env
const processUpload = async (upload, size, type, userId) => {
  const assetsDir = path.join(__dirname, '..', ASSETS_DIR, AVATARS_DIR)
  const sizeToNum = parseInt(size.split(' ')[0])
  await mkdirp(assetsDir, () => {})
  switch (type) {
    case 'avatar':
      const time = Date.now().toString()
      const { filename, mimetype, encoding, createReadStream } = await upload
      await Joi.validate({ size: sizeToNum, mimetype }, uploadAvatar(size), { abortEarly: false })
      const uniqueFilename = `${time}_${filename}`
      const pathToFile = `${assetsDir}/${uniqueFilename}`
      const url = `http://localhost:4001/images/avatars/${uniqueFilename}`
      await new Promise((resolve) =>
        createReadStream()
          .pipe(createWriteStream(pathToFile))
          .on('error', e => console.log(e))
          .on('close', resolve))
      const file = await File.create({
        mimetype,
        filename: uniqueFilename,
        encoding,
        path: pathToFile,
        url,
        createdBy: userId,
        size })
      await User.updateOne({ _id: userId }, { $push: { avatar: file } })
      return file

    default:
      break
  }
}

export default {
  Query: {
    uploads: () => File.find()
  },
  Mutation: {
    singleUpload: async (root, { file, size }, { req }) => processUpload(file, size, 'avatar', req.session.userId)
  },
  File: {
    createdBy: async (user, args, context, info) => {
      return (await user.populate('createdBy').execPopulate()).createdBy
    }
  }
}
