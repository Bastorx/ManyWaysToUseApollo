import * as React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
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

export default () => {
  const { loading, data, error } = useQuery<{ todos: Todo[] }>(GET_TODOS);

  const [addTodo] = useMutation<{ todo: Todo }, { input: TodoInput }>(
    ADD_TODO,
    {
      update(cache, { data: { todo } }) {
        const { todos } = cache.readQuery<{ todos: Todo[] }>({
          query: GET_TODOS
        });
        cache.writeQuery({
          query: GET_TODOS,
          data: { todos: todos.concat([todo]) }
        });
      }
    }
  );
  const [updateTodo] = useMutation<
    { todo: Todo },
    { id: string; input: TodoInput }
  >(UPDATE_TODO, {
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
      }
    }
  });
  const [removeTodo] = useMutation<any, { id: string }>(REMOVE_TODO, {
    update(cache, { data: { deleteTodo } }) {
      const { todos } = cache.readQuery<{ todos: Todo[] }>({
        query: GET_TODOS
      });
      // debugger;
      const newTodos = reject(todos, (todo) => todo.id === deleteTodo);
      cache.writeQuery({
        query: GET_TODOS,
        data: { todos: newTodos }
      });
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
