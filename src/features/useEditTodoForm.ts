import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Todo, todoApi, todoSchema } from '../entities/todoApi';

export function useEditTodoForm({ setIsVisible, currentTodo }: { setIsVisible: (isVisible: boolean) => void; currentTodo: Todo | null }) {
  const queryClient = useQueryClient();
  const form = useForm<Todo>({
    resolver: zodResolver(todoSchema)
  });

  const { mutate } = useMutation({
    mutationFn: (formData: Todo) => {
      return todoApi.updateTodo(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setIsVisible(false);
      form.reset();
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    }
  });

  useEffect(() => {
    if (currentTodo) {
      form.reset({ ...currentTodo });
    }
  }, [form, currentTodo]);

  return { form, mutate };
}
