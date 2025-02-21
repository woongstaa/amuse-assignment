import { z } from 'zod';
import api from './api';

export const todoSchema = z.object({
  id: z.number(),
  title: z.string().nonempty('할 일을 입력해주세요').min(1, '할 일을 1자 이상 입력해주세요'),
  dueDate: z.date().optional(),
  memo: z.string().optional(),
  createdAt: z.date(),
  lastEditedAt: z.date(),
  removedAt: z.date().optional(),
  isPrior: z.boolean(),
  isComplete: z.boolean()
});

export type Todo = z.infer<typeof todoSchema>;

export const todoApi = {
  getTodos: async () => {
    const response = await api('get', '/todos');
    return response;
  },
  createTodo: async (todo: Todo) => {
    const response = await api('post', '/todos', todo);
    return response;
  },
  updateTodo: async (todo: Todo) => {
    const response = await api('put', `/todos/${todo.id}`, todo);
    return response;
  },
  deleteTodo: async (id: number) => {
    const response = await api('delete', `/todos/${id}`);
    return response;
  }
};
