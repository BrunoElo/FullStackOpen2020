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
    published
    author {
      name
      id
      born
      bookCount
    }
    genres
    id
  }
}
`