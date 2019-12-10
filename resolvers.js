
const { GraphQLScalarType } = require('graphql')
let photos = [];
let _id = 0;
const resolvers = {
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos
    },
    Mutation: {
        postPhoto(parent, args) {
            let newPhotos = {
                id: _id++,
                ...args.input
            }
            photos.push(newPhotos)
            return newPhotos
        }
    },
    Photo: {
        url: parent => `https:mysite.com/image/${parent.id}.jpg`,
        postedBy: parent => {
            return users.find(u => u.githubLogin === parent.githubUser)
        },
        taggedUsers: parent => tags
            .filter(tag => tag.photoID === parent.id)
            .map(tag => tag.userID)
            .map(userID => users.find(u => u.githubLogin === userID)),
    },
    User: {
        postedPhotos: parent => {
            return photos.filter(p => p.githubUser === parent.githubLogin)
        },
        inPhotos: parent => tags
            .filter(tag => tag.userID === parent.id)
            .map(tag => tag.photoID)
            .map(photoID => photos.find(p => p.id === photoID))
    },
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: '一个时间值',
        parseValue: value => new Date(value),
        serialize: value => new Date(value),
        parseLiteral: ast => ast.value
    })
};

module.exports = resolvers