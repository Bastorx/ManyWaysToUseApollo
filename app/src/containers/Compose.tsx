import * as React from "react";
import { withApollo, graphql } from "react-apollo";
import { compose } from "recompose";

import { findIndex, reject } from "lodash";

import {
  Todo,
  GET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  REMOVE_TODO,
  TodoInput
} from "../graphql/Todo";
import TodoList from "../components/TodoList";

export default compose(
  withApollo,
  graphql<Todo[]>(GET_TODOS),
  graphql<Todo, { input: TodoInput }>(ADD_TODO, {
    name: "addTodo",
    options: {
      update: (cache, { data: { todo } }) => {
        const { todos } = cache.readQuery<{ todos: Todo[] }>({
          query: GET_TODOS
        });
        cache.writeQuery({
          query: GET_TODOS,
          data: { todos: todos.concat([todo]) }
        });
      }
    }
  }),
  graphql<Todo, { id: string; input: TodoInput }>(UPDATE_TODO, {
    name: "updateTodo",
    options: {
      update: (cache, { data: { todo } }) => {
        const { todos } = cache.readQuery<{ todos: Todo[] }>({
          query: GET_TODOS
        });
        const i = findIndex(todos, (t) => t.id === todo.id);
        if (i >= 0) {
          todos[i] = todo;
          cache.writeQuery({
            query: GET_TODOS,
            data: { todos }
          });
        }
      }
    }
  }),
  graphql<any, { id: string }>(REMOVE_TODO, {
    name: "removeTodo",
    options: {
      update: (cache, { data: { deleteTodo } }) => {
        const { todos } = cache.readQuery<{ todos: Todo[] }>({
          query: GET_TODOS
        });
        const newTodos = reject(todos, (todo) => todo.id === deleteTodo);
        cache.writeQuery({
          query: GET_TODOS,
          data: { todos: newTodos }
        });
      }
    }
  })
)(TodoList);
