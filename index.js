const { ApolloServer } = require('apollo-server-express');
const expressPlayground = require('graphql-playground-middleware-express').default
const express = require('express')
const app = express()
const { readFileSync } = require('fs')
const typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8') //引入schema
const resolvers = require('./resolvers') //引入解析器
const server = new ApolloServer({
  typeDefs,
  resolvers
})
server.applyMiddleware({ app })

app.get('/', (req, res) => {
  res.end('graphql api')
})

app.get('/playground', expressPlayground({ endpoint: '/graphql' }))


app
  .listen({ port: 4000 }, () => {
    console.log(`
    GraphQL Service running on http://localhost:4000
  `)
  })