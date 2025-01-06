import { Todo, TodoService } from '../../services/todo.service';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  todos: Todo[] = [];
  newTodoTitle = '';
  title = 'Todo List';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos = this.todoService.getAllTodos();
  }

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodo(this.newTodoTitle);
      this.newTodoTitle = '';
      this.todos = this.todoService.getAllTodos();
    }
  }

  toggleComplete(todo: Todo): void {
    this.todoService.updateTodo(todo.id, { completed: !todo.completed });
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
    this.todos = this.todoService.getAllTodos();
  }
}
