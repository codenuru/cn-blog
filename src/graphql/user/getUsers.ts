import { gql } from '@apollo/client'

export const getUsersQuery = gql`
  query users {
    users {
      id
      name
      surname
    }
  }
`
