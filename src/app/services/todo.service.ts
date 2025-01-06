import { Injectable } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  private lastId = 0;

  constructor() {}

  getAllTodos(): Todo[] {
    return this.todos;
  }

  getTodoById(id: number): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  addTodo(title: string): Todo {
    const newTodo: Todo = {
      id: ++this.lastId,
      title,
      completed: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  updateTodo(id: number, changes: Partial<Todo>): Todo | undefined {
    const todo = this.getTodoById(id);
    if (todo) {
      Object.assign(todo, changes);
    }
    return todo;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
