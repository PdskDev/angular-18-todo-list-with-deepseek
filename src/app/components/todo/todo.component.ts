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
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getAllTodos().subscribe({
      next: (todos) => (this.todos = todos),
      error: (err) => console.error('Error loading todos:', err),
    });
  }

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodo(this.newTodoTitle).subscribe({
        next: () => {
          this.newTodoTitle = '';
          this.loadTodos();
        },
        error: (err) => console.error('Error adding todo:', err),
      });
    }
  }

  toggleComplete(todo: Todo): void {
    this.todoService
      .updateTodo(todo._id, { completed: !todo.completed })
      .subscribe({
        next: () => this.loadTodos(),
        error: (err) => console.error('Error updating todo:', err),
      });
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe({
      next: () => this.loadTodos(),
      error: (err) => console.error('Error deleting todo:', err),
    });
  }
}
