import {gql} from "@apollo/client";

const AUTHOR_DETAILS = gql`
    fragment AuthorDetails on Author {
        bookCount
        name
        id
        born
    }
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    ...AuthorDetails
  }
}
${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
query AllBooks($genre: String, $author: String) {
 allBooks(genre: $genre, author: $author) {
    title
    published
    author {
      ...AuthorDetails
    }
    genres
    id
  }
}
${AUTHOR_DETAILS}
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