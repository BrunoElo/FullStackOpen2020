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
query AllBooks($genre: String, $author: String) {
 allBooks(genre: $genre, author: $author) {
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
export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`
export const ME = gql`
query {
  me {
    username
    genres
    id
  }
}
`