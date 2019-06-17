import Joi from 'joi'
import mongoose from 'mongoose'
import { User } from '../models'
import { UserInputError } from 'apollo-server-express'
import { attmeptSignIn, signOut } from '../auth'
import { signIn, signUp } from '../joiSchemas'

export default {
  Query: {
    me: (root, args, { req }, info) => {
      // TODO: projection
      return User.findById(req.session.userId)
    },
    // TODO: pagination
    users: (root, args, { req }, info) => {
      const users = User.find({})
      if (users.legnth) {
        throw new UserInputError(`Found no Users`)
      }
      return users
    },
    // TODO: pagination
    searchUsers: (root, args, { req }, info) => {
      const users = User.find({ $or: [
        { fname: { $regex: `${args.filter.fname}`, $options: 'i' } },
        { lname: { $regex: `${args.filter.lname}`, $options: 'i' } },
        { username: { $regex: `${args.filter.username}`, $options: 'i' } },
        { email: { $regex: `${args.filter.email}`, $options: 'i' } }
      ]
      }, null, { limit: 2 })
      if (users.legnth) {
        throw new UserInputError(`Found no Users`)
      }
      return users
    },
    user: (root, { id }, { req }, info) => {
      // TODO: projection
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`invalid ID`)
      }
      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      await Joi.validate(args, signUp, { abortEarly: false })
      const user = await User.create(args)
      req.session.userId = user.id
      return user
    },
    signIn: async (root, args, { req, res }, info) => {
      const { email, password } = args
      await Joi.validate(args, signIn, { abortEarly: false })
      const user = await attmeptSignIn(email, password)
      req.session.userId = user.id
      res.cookie('sid', user.id, { signed: true, httpOnly: true })
      return user
    },
    signOut: (root, args, { req, res }, info) => {
      return signOut(req, res)
    }
  },
  User: {
    posts: async (user, args, context, info) => {
      return (await user.populate({ path: 'posts', options: { sort: { createdAt: -1 } } }).execPopulate()).posts
    }
  }
}
