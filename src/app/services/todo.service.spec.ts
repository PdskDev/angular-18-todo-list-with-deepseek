import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a todo', () => {
    const initialCount = service.getAllTodos().length;
    service.addTodo('Test Todo');
    expect(service.getAllTodos().length).toBe(initialCount + 1);
  });

  it('should get all todos', () => {
    service.addTodo('Test Todo 1');
    service.addTodo('Test Todo 2');
    const todos = service.getAllTodos();
    expect(todos.length).toBe(2);
  });

  it('should update a todo', () => {
    service.addTodo('Test Todo');
    const todo = service.getAllTodos()[0];
    service.updateTodo(todo.id, { completed: true });
    const updatedTodo = service.getAllTodos()[0];
    expect(updatedTodo.completed).toBeTrue();
  });

  it('should delete a todo', () => {
    service.addTodo('Test Todo');
    const initialCount = service.getAllTodos().length;
    const todo = service.getAllTodos()[0];
    service.deleteTodo(todo.id);
    expect(service.getAllTodos().length).toBe(initialCount - 1);
  });

  it('should generate unique ids', () => {
    service.addTodo('Test Todo 1');
    service.addTodo('Test Todo 2');
    const todos = service.getAllTodos();
    expect(todos[0].id).not.toBe(todos[1].id);
  });
});
