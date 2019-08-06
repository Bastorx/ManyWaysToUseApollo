import * as React from "react";
import ListElement from "./ListElement";
import { Todo } from "../../graphql/Todo";

interface Props {
  todos: Todo[];
  removeTodo: (id: string) => any;
  updateTodo: (id: string, text: string) => any;
}

export default ({ todos, updateTodo, removeTodo }: Props) => {
  return (
    <div>
      <table>
        <caption>Todo List</caption>
        <thead>
          <tr style={{ backgroundColor: "lightgrey" }}>
            <th>id</th>
            <th>Text</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <ListElement
              key={todo.id}
              todo={todo}
              updateTodo={updateTodo}
              removeTodo={removeTodo}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
