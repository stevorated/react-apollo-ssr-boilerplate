import Joi from 'joi'
import mongoose from 'mongoose'
import { createPost } from '../joiSchemas'
import { User, Post } from '../models'
import { UserInputError } from 'apollo-server-core'

export default {
  Query: {
    getMyPosts: async (root, { id, limit = null, skip = 0, sort = -1 }, { req }, info) => {
      if (sort !== 1 && sort !== -1) {
        throw new UserInputError(`invalid sort must be 1 or -1`)
      }
      if (!mongoose.Types.ObjectId.isValid(req.session.userId)) {
        throw new UserInputError(`invalid ID`)
      }
      const posts = await Post.find({ createdBy: mongoose.Types.ObjectId(req.session.userId) }, null, { sort: { createdAt: sort }, limit, skip })
      return posts
    },
    getPosts: async (root, { limit = null, skip = 0 }, { req }, info) => {
      const posts = await Post.find({}, null, { sort: { createdAt: -1 }, limit, skip })
      return posts
    },
    getUsersPosts: async (root, { id, limit = null, skip = 0, sort = -1 }, { req }, info) => {
      if (sort !== 1 && sort !== -1) {
        throw new UserInputError(`invalid sort must be 1 or -1`)
      }
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`invalid ID`)
      }
      const posts = await Post.find({ createdBy: mongoose.Types.ObjectId(id) }, null, { sort: { createdAt: sort }, limit, skip })
      return posts
    }
  },
  Mutation: {
    createPost: async (root, args, { req }, info) => {
      const { userId } = req.session
      const { body } = args
      await Joi.validate(args, createPost(userId), { abortEarly: false })
      const post = await Post.create({ body, createdBy: userId })
      await User.updateOne({ _id: userId }, { $push: { posts: post } })
      return post
    }
  },
  Post: {
    comments: async (user, args, context, info) => {
      return (await user.populate('comments').execPopulate()).comments
    },
    createdBy: async (user, args, context, info) => {
      return (await user.populate('createdBy').execPopulate()).createdBy
    }
  }
}

// const idsFound = await User.where('_id').in(userIds).countDocuments()
// if (idsFound !== userIds.length) {
//   throw new UserInputError('One or more UserIds are INVALID')
// }
// userIds.push(userId)
