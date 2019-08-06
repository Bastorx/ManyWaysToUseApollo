import * as React from "react";
import { useState } from "react";
import { Todo } from "../../graphql/Todo";

interface Props {
  todo: Todo;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
}

export default ({ todo, updateTodo, removeTodo }: Props) => {
  const [editable, setEditable] = useState<boolean>(false);
  const [text, setText] = useState<string>(todo.text);

  return (
    <tr>
      <td>{todo.id}</td>
      <td>
        {editable ? (
          <input value={text} onChange={(e) => setText(e.target.value)} />
        ) : (
          <span>{todo.text}</span>
        )}
      </td>
      <td>
        {editable ? (
          <button
            onClick={() => {
              updateTodo(todo.id, text);
              setEditable(false);
            }}>
            Submit
          </button>
        ) : (
          <button onClick={() => setEditable(true)}>Edit</button>
        )}
        <button onClick={() => removeTodo(todo.id)}>Delete</button>
      </td>
    </tr>
  );
};
