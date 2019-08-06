import { remove, findIndex } from "lodash";

export interface Todo {
  id: number;
  text: string;
}

let instance: TodoFactory;

export default class TodoFactory {
  private todos: Todo[] = [];
  private count: number = 0;
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }
  public addTodo(text: string): Todo {
    const todo = {
      id: this.count,
      text
    };
    this.todos.push(todo);
    this.count++;
    return todo;
  }
  public removeTodo(id: number): boolean {
    remove(this.todos, (todo: Todo) => todo.id === id);
    return true;
  }
  public updateTodo(id: number, text: string): Todo {
    const index = findIndex(this.todos, (todo: Todo) => todo.id === id);
    if (index >= 0) {
      this.todos[index].text = text;
    }
    return this.todos[index];
  }
  public getTodoById(id: number): Todo {
    const index = findIndex(this.todos, (todo: Todo) => todo.id === id);
    return this.todos[index];
  }
  public getTodos(): Todo[] {
    return this.todos;
  }
}
