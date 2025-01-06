import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { TodoService } from '../../services/todo.service';
import { of } from 'rxjs';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let todoService: jasmine.SpyObj<TodoService>;

  beforeEach(async () => {
    const todoServiceSpy = jasmine.createSpyObj('TodoService', [
      'getAllTodos',
      'addTodo',
      'updateTodo',
      'deleteTodo',
    ]);

    await TestBed.configureTestingModule({
      imports: [TodoComponent],
      providers: [{ provide: TodoService, useValue: todoServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos on init', () => {
    const mockTodos = [{ id: 1, title: 'Test Todo', completed: false }];
    todoService.getAllTodos.and.returnValue(mockTodos);

    fixture.detectChanges();

    expect(todoService.getAllTodos).toHaveBeenCalled();
    expect(component.todos).toEqual(mockTodos);
  });

  it('should add a todo', () => {
    component.newTodoTitle = 'New Todo';
    todoService.addTodo.and.callFake((title: string) => {
      const newTodo = { id: 1, title, completed: false };
      todoService.getAllTodos.and.returnValue([newTodo]);
      return newTodo;
    });

    component.addTodo();

    expect(todoService.addTodo).toHaveBeenCalledWith('New Todo');
    expect(component.newTodoTitle).toBe('');
  });

  it('should not add empty todo', () => {
    component.newTodoTitle = '   ';
    component.addTodo();

    expect(todoService.addTodo).not.toHaveBeenCalled();
  });

  it('should toggle todo completion', () => {
    const mockTodo = { id: 1, title: 'Test Todo', completed: false };
    todoService.updateTodo.and.returnValue(undefined);

    component.toggleComplete(mockTodo);

    expect(todoService.updateTodo).toHaveBeenCalledWith(1, { completed: true });
  });

  it('should delete a todo', () => {
    const mockTodoId = 1;
    todoService.deleteTodo.and.returnValue(undefined);

    component.deleteTodo(mockTodoId);

    expect(todoService.deleteTodo).toHaveBeenCalledWith(1);
  });
});
