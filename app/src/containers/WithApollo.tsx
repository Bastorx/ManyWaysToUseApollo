import * as React from "react";
import { useState } from "react";
import { withApollo, WithApolloClient } from "react-apollo";
import { findIndex, reject } from "lodash";
import TodoList from "../components/TodoList";

import {
  Todo,
  TodoInput,
  GET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  REMOVE_TODO
} from "../graphql/Todo";

const WithApolloExample = ({ client }: WithApolloClient<{}>) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();
  client
    .query<{ todos: Todo[] }>({ query: GET_TODOS })
    .then(({ data }) => setData(data))
    .catch((error) => setError(error))
    .finally(() => setLoading(false));

  const addTodo = (variables: any) =>
    client.mutate<{ todo: Todo }, { input: TodoInput }>({
      mutation: ADD_TODO,
      ...variables,
      update(cache, { data: { todo } }) {
        const { todos } = cache.readQuery<{ todos: Todo[] }>({
          query: GET_TODOS
        });
        cache.writeQuery({
          query: GET_TODOS,
          data: { todos: todos.concat([todo]) }
        });
        setData({ todos: todos.concat([todo]) });
      }
    });

  const updateTodo = (variables: any) =>
    client.mutate<{ todo: Todo }, { id: string; input: TodoInput }>({
      mutation: UPDATE_TODO,
      ...variables,
      update(cache, { data: { todo } }) {
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
          setData({ todos });
        }
      }
    });

  const removeTodo = (variables: any) =>
    client.mutate<any, { id: string }>({
      mutation: REMOVE_TODO,
      ...variables,
      update(cache, { data: { deleteTodo } }) {
        const { todos } = cache.readQuery<{ todos: Todo[] }>({
          query: GET_TODOS
        });
        const newTodos = reject(todos, (todo) => todo.id === deleteTodo);
        cache.writeQuery({
          query: GET_TODOS,
          data: { todos: newTodos }
        });
        setData({ todos: newTodos });
      }
    });

  return (
    <TodoList
      data={data}
      loading={loading}
      error={error}
      addTodo={addTodo}
      updateTodo={updateTodo}
      removeTodo={removeTodo}
    />
  );
};

export default withApollo<{}>(WithApolloExample);
