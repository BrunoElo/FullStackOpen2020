import {gql} from "@apollo/client";

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    bookCount
    name
    id
    born
  }
}
`

export const ALL_BOOKS = gql`
query {
 allBooks {
    title
    author
    published
    id
  }
}
`