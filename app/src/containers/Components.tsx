import * as React from "react";
import { Query, Mutation } from "react-apollo";
import { findIndex, reject } from "lodash";
import TodoList from "../components/TodoList";

import {
  Todo,
  GET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  REMOVE_TODO
} from "../graphql/Todo";

export default () => (
  <Query query={GET_TODOS}>
    {({ data, loading, error }) => (
      <Mutation
        mutation={ADD_TODO}
        update={(cache, { data: { todo } }) => {
          const { todos } = cache.readQuery<{ todos: Todo[] }>({
            query: GET_TODOS
          });
          cache.writeQuery({
            query: GET_TODOS,
            data: { todos: todos.concat([todo]) }
          });
        }}>
        {(addTodo) => (
          <Mutation
            mutation={UPDATE_TODO}
            update={(cache, { data: { todo } }) => {
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
            }}>
            {(updateTodo) => (
              <Mutation
                mutation={REMOVE_TODO}
                update={(cache, { data: { deleteTodo } }) => {
                  const { todos } = cache.readQuery<{ todos: Todo[] }>({
                    query: GET_TODOS
                  });
                  const newTodos = reject(
                    todos,
                    (todo) => todo.id === deleteTodo
                  );
                  cache.writeQuery({
                    query: GET_TODOS,
                    data: { todos: newTodos }
                  });
                }}>
                {(removeTodo) => (
                  <TodoList
                    data={data}
                    loading={loading}
                    error={error}
                    addTodo={addTodo}
                    updateTodo={updateTodo}
                    removeTodo={removeTodo}
                  />
                )}
              </Mutation>
            )}
          </Mutation>
        )}
      </Mutation>
    )}
  </Query>
);
