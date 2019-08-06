import Todo from "../controllers/todos";

const TodoFactory = new Todo();

export default {
  Query: {
    todo: async (obj: any, { id }: { id: string }) => {
      const res = TodoFactory.getTodoById(parseInt(id));
      return res;
    },
    todos: async () => {
      const res = TodoFactory.getTodos();
      return res;
    }
  },
  Mutation: {
    createTodo: async (obj: any, { input }: { input: { text: string } }) => {
      const res = TodoFactory.addTodo(input.text);
      return res;
    },
    updateTodo: async (
      obj: any,
      { id, input }: { id: string; input: { text: string } }
    ) => {
      const res = TodoFactory.updateTodo(parseInt(id), input.text);
      return res;
    },
    deleteTodo: async (obj: any, { id }: { id: string }) => {
      TodoFactory.removeTodo(parseInt(id));
      return id;
    }
  }
};
