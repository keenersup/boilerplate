import gql from "graphql-tag";


export interface IUsers {
    username: string
    email: string
    id: string
    roles: number
    createdAt: string
    __typename: string
}

export const USERS_QUERY = gql`
    query users{
        users{
            username
            email
            id
            roles
            createdAt
        }
    }
`
