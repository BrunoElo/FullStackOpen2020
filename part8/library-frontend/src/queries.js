import {gql} from "@apollo/client";

const AUTHOR_DETAILS = gql`
    fragment AuthorDetails on Author {
        bookCount
        name
        id
        born
    }
`

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        published
        author {
          ...AuthorDetails
        }
        genres
        id
    }
    ${AUTHOR_DETAILS}
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
    ...BookDetails
  }
}
${BOOK_DETAILS}
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

export const SET_BIRTH_YEAR = gql`
mutation setBirthYear($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    born
    name
  }
}
`

export const ADD_NEW_BOOK = gql`
mutation addNewBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription BookAdded {
  bookAdded {
    ...BookDetails
  }
}
  ${BOOK_DETAILS}
`