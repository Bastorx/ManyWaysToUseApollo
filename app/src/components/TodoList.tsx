import * as React from "react";
import List from "./todo/List";
import Add from "./todo/Add";

const TodoList = ({
  loading,
  data,
  error,
  updateTodo,
  removeTodo,
  addTodo
}: any) => {
  if (loading) {
    return <div>Data loading</div>;
  }
  if (error) {
    return <div>Data Error</div>;
  }
  return (
    <div>
      <List
        todos={data.todos}
        updateTodo={(id: string, text: string) => {
          updateTodo({ variables: { id, input: { text } } });
        }}
        removeTodo={(id: string) => {
          removeTodo({ variables: { id } });
        }}
      />
      <Add
        addTodo={(text: string) => {
          addTodo({ variables: { input: { text } } });
        }}
      />
    </div>
  );
};

export default TodoList;
