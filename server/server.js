const { gql, ApolloServer } = require("apollo-server");

const typeDefs = gql`
  type Query{
    greeting: String
  }
`

//Resolvers need to match typeDefs 
const resolvers = {
  Query: {
    greeting: () => "Hello GraphQL"
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen({ port: 9000 }).then(serverInfo => console.log(`Server listening at ${serverInfo.url}`))