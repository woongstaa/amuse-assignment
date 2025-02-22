import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { todoApi, type Todo } from './todoApi';
import { apiClient } from './api';

describe('Todo API 테스트', () => {
  let mock: MockAdapter;

  const mockTodo: Todo = {
    id: 1,
    title: '테스트 할 일',
    isComplete: false,
    priority: '2',
    memo: '메모 내용',
    dueDate: new Date('2024-03-20')
  };

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.reset();
  });

  describe('getTodos', () => {
    it('할 일 목록을 가져와야 함', async () => {
      const mockTodos = [mockTodo];
      mock.onGet('/todos').reply(200, mockTodos);

      const result = await todoApi.getTodos();
      expect(JSON.stringify(result)).toBe(JSON.stringify(mockTodos));
    });

    it('쿼리 파라미터로 필터링된 목록을 가져와야 함', async () => {
      const mockTodos = [mockTodo];
      mock.onGet('/todos', { params: { isComplete: 'true' } }).reply(200, mockTodos);

      const result = await todoApi.getTodos({ isComplete: 'true' });
      expect(JSON.stringify(result)).toBe(JSON.stringify(mockTodos));
    });
  });

  describe('createTodo', () => {
    it('새로운 할 일을 생성해야 함', async () => {
      const newTodo = {
        title: '새로운 할 일',
        isComplete: false,
        priority: '1' as const,
        dueDate: new Date('2024-03-21')
      };
      const mockResponse = { ...newTodo, id: '2' };

      mock.onPost('todos', JSON.parse(JSON.stringify(newTodo))).reply(201, mockResponse);

      const result = await todoApi.createTodo(newTodo);
      expect(JSON.stringify(result)).toBe(JSON.stringify(mockResponse));
    });
  });

  describe('updateTodo', () => {
    it('기존 할 일을 수정해야 함', async () => {
      const updatedTodo = { ...mockTodo, title: '수정된 할 일' };
      mock.onPut('todos/1').reply(200, updatedTodo);

      const result = await todoApi.updateTodo(updatedTodo);
      expect(JSON.stringify(result)).toBe(JSON.stringify(updatedTodo));
    });
  });

  describe('deleteTodo', () => {
    it('할 일을 삭제해야 함', async () => {
      mock.onDelete(`/todos/${mockTodo.id}`).reply(200);

      await expect(todoApi.deleteTodo(mockTodo.id)).resolves.not.toThrow();
    });
  });

  describe('에러 처리', () => {
    it('getTodos 실패 시 에러를 throw 해야 함', async () => {
      mock.onGet('/todos').reply(500);

      await expect(todoApi.getTodos()).rejects.toThrow();
    });

    it('createTodo 실패 시 에러를 throw 해야 함', async () => {
      const newTodo = {
        title: '새로운 할 일',
        isComplete: false
      };
      mock.onPost('/todos').reply(400);

      await expect(todoApi.createTodo(newTodo)).rejects.toThrow();
    });

    it('updateTodo 실패 시 에러를 throw 해야 함', async () => {
      mock.onPut(`/todos/${mockTodo.id}`).reply(404);

      await expect(todoApi.updateTodo(mockTodo)).rejects.toThrow();
    });

    it('deleteTodo 실패 시 에러를 throw 해야 함', async () => {
      mock.onDelete(`/todos/${mockTodo.id}`).reply(404);

      await expect(todoApi.deleteTodo(mockTodo.id)).rejects.toThrow();
    });
  });
});
