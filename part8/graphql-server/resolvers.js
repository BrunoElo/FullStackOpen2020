const Book = require("./models/book");
const Author = require("./models/author");
const {GraphQLError} = require("graphql/error");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.author || args.genre) {
                let filteredBooks = Book.find({})
                if (args.author) {
                    const author = await Author.findOne({name: args.author})
                    filteredBooks = filteredBooks.find({author: author._id})
                }
                if (args.genre) {
                    filteredBooks = filteredBooks.find({genres: args.genre})
                }
                return filteredBooks
            }
            return Book.find({})
        },
        allAuthors: async () => Author.find({}).populate('bookCount'),
        me: (root, args, context) => context.currentUser
    },
    Author: {
        bookCount: (root) => root.bookCount.length
    },
    Book: {
        author: async (root) => await Author.findById(root.author)
    },
    Mutation: {
        addBook: async (root, args, {currentUser}) => {
            // Allow authorized user
            if (!currentUser) {
                throw new GraphQLError('wrong credentials', {
                    extensions: { code: 'BAD_USER_INPUT' }
                })
            }

            // Add new author to server
            let author = await Author.findOne({name: args.author})
            if (!author) {
                author = new Author({name: args.author, born: null})

            }
            const book = new Book({...args, author: author._id}) // update book with author id
            author.bookCount.push(book._id)
            try {
                await author.save()
            } catch (error) {
                throw new GraphQLError('Author name too short', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.author,
                        error
                    }
                })
            }
            try {
                await book.save()
            } catch (error) {
                throw new GraphQLError('Saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.author,
                        error
                    }
                })
            }

            pubsub.publish('BOOK_ADDED', {bookAdded: book})
            return book
        },
        editAuthor: async (root, args, {currentUser}) => {
            // Allow authorized user
            if (!currentUser) {
                throw new GraphQLError('wrong credentials', {
                    extensions: { code: 'BAD_USER_INPUT' }
                })
            }

            const author = await Author.findOne({name: args.name})
            if (!author) {
                throw new GraphQLError('Author does not exist', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                    }
                })
            }
            author.born = args.setBornTo
            try {
                await author.save()
            } catch (error) {
                throw new GraphQLError('Saving author failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }
            return author
        },
        createUser: async (root, args) => {
            const user = new User({username: args.username, genres: [args.favoriteGenre]});

            return user.save().catch(error => {
                throw new GraphQLError('Creating the user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.username,
                        error
                    }
                })
            })
        },
        login: async (root, args) => {
            // Check if user exists
            const user = await User.findOne({username: args.username})

            if(!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT',

                    }
                })
            }

            // Create and return token
            const userForToken = {
                username: user.username,
                id: user._id
            }
            return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
    }
}

module.exports = resolvers