import { gql } from "apollo-boost";

export interface Todo {
  id: string;
  text: string;
}

export interface TodoInput {
  text: string;
}

export const GET_TODOS = gql`
  {
    todos {
      id
      text
    }
  }
`;

export const ADD_TODO = gql`
  mutation createTodo($input: TodoInput!) {
    todo: createTodo(input: $input) {
      id
      text
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo($id: ID!, $input: TodoInput!) {
    todo: updateTodo(id: $id, input: $input) {
      id
      text
    }
  }
`;

export const REMOVE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
