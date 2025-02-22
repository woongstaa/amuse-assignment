import { z } from 'zod';
import api from './api';

export const todoSchema = z.object({
  id: z.string(),
  title: z.string().nonempty('할 일을 입력해주세요').min(1, '할 일을 1자 이상 입력해주세요'),
  dueDate: z.date().optional(),
  memo: z.string().optional(),
  priority: z.enum(['0', '1', '2', '3']).nullish(),
  isComplete: z.boolean()
});

export type Todo = z.infer<typeof todoSchema>;

export const createTodoSchema = todoSchema
  .omit({
    id: true
  })
  .extend({
    createdAt: z.date().default(() => new Date()),
    lastEditedAt: z.date().default(() => new Date())
  });

export type CreateTodo = z.infer<typeof createTodoSchema>;

export const todoApi = {
  getTodos: async (queryParams?: { [key: string]: string }) => {
    const response = await api<Todo[]>('get', '/todos', undefined, { params: queryParams });

    return response;
  },
  createTodo: async (todo: CreateTodo) => {
    const response = await api('post', '/todos', todo);
    return response;
  },
  updateTodo: async (todo: Todo) => {
    const response = await api('put', `/todos/${todo.id}`, todo);
    return response;
  },
  deleteTodo: async (id: string) => {
    const response = await api('delete', `/todos/${id}`);
    return response;
  }
};
