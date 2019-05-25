import Joi from 'joi'
import { createPost } from '../joiSchemas'
import { User, Post } from '../models'
// import { UserInputError } from 'apollo-server-core'

export default {
  Mutation: {
    createPost: async (root, args, { req }, info) => {
      const { userId } = req.session
      const { body } = args
      await Joi.validate(args, createPost(userId), { abortEarly: false })
      // const idsFound = await User.where('_id').in(userIds).countDocuments()
      // if (idsFound !== userIds.length) {
      //   throw new UserInputError('One or more UserIds are INVALID')
      // }
      // userIds.push(userId)
      const post = await Post.create({ body, createdBy: userId })
      // await User.updateOne({_id: })
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
