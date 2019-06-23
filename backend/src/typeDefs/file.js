import { gql } from 'apollo-server-express'

export default gql`

  extend type Mutation {
    singleUpload(file: Upload, size: String!): File!
  }

  extend type Query {
    uploads: [File]
  }

  type File {
    id: ID!
    mimetype: String!
    filename: String!
    encoding: String!
    path: String!
    url: String!
    size: String!
    createdBy: User!
    createdAt: String!
  }
`
