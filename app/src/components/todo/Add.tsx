import * as React from "react";
import { useState } from "react";

interface Props {
  addTodo: (todo: string) => void;
}

export default ({ addTodo }: Props) => {
  const [text, setText] = useState<string>("");
  return (
    <div>
      <input
        placeholder="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button
        onClick={() => {
          addTodo(text);
          setText("");
        }}>
        Add Todo
      </button>
    </div>
  );
};
