const { ApolloServer } = require("apollo-server");
const typeDefs = `
    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]!
    }
    type Mutation {
      postPhoto (name: String! description: String): Photo!
    }
    type Photo {
      id: ID!
      url: String!
      name: String!
      description: String
    }
`;
let _id = 0;
let photos = [];
const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos
  },
  Mutation: {
    postPhoto(parent, args) {
      let newPhoto = {
        id: _id++,
        ...args
      }
      photos.push(newPhoto)
      return newPhoto
    }
  },
  Photo: {
    url: parent => `http://godcodetop.com/img/${parent.id}.jpg`
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server
  .listen()
  .then(({ url }) => console.log(`
    GraphQL Service running on ${url}
  `)
  );