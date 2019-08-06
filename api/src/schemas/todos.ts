import { makeExecutableSchema } from "graphql-tools";
import resolvers from "../resolvers/todos";

export const typeDefs = `
  type Todo { 
    id: ID!
    text: String!
  }
  type Query {
      todo(id: ID!): Todo
      todos: [Todo]
  }
  input TodoInput {
    text: String
  }
  type Mutation {
    createTodo (input: TodoInput): Todo
    updateTodo (id: ID!, input: TodoInput): Todo
    deleteTodo (id: ID!): ID
  }
  schema {
    query: Query
    mutation: Mutation
   }
`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
