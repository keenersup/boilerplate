import {gql} from 'apollo-server-express'

export default gql`
    type User{
        id: ID!
        username: String!
        email: String!
        createdAt: String
        accessToken: String
        roles:  Int!
    }

    type Token{
        accessToken: String!
    }

    extend type Query{
        me: User @auth
        user(id: ID!): User @admin
        users: [User!]! @admin
    }
    extend type Mutation{
        register(
            username: String!
            email: String!
            password: String!
            confirmPassword: String!
            clientId: String!
        ):User! @guest

        login(
            email: String!
            password: String!
            clientId: String!
        ):User! @guest

        logout: Boolean!

        deleteAccount(
            email: String!
            password: String!
        ):Boolean! @auth

        refreshToken(accessToken: String!, clientId: String!): Token!

        deleteSelectedUser(id:ID!): Boolean! @admin
        empowerAdmin(id:ID! roles: Int!):Boolean @admin
    }
`
