import { todoApi } from '@/entities/todoApi';
import { queryOptions } from '@tanstack/react-query';

export const todoQueryOptions = (q: string | null, isComplete: string | null, priority: string | null) =>
  queryOptions({
    queryKey: ['todos', q, isComplete, priority],
    queryFn: () => {
      if (q) {
        return todoApi.getTodos({ q });
      }

      if (isComplete) {
        return todoApi.getTodos({ isComplete });
      }

      if (priority) {
        return todoApi.getTodos({ priority });
      }

      return todoApi.getTodos();
    }
  });
