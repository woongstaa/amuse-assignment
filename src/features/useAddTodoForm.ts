import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { todoApi, CreateTodo, createTodoSchema } from '../entities/todoApi';

export function useAddTodoForm({ isVisible, setIsVisible }: { isVisible: boolean; setIsVisible: (isVisible: boolean) => void }) {
  const queryClient = useQueryClient();

  const form = useForm<CreateTodo>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: '',
      dueDate: undefined,
      memo: '',
      priority: '0',
      isComplete: false
    }
  });

  const { mutate } = useMutation({
    mutationFn: (formData: CreateTodo) => todoApi.createTodo(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setIsVisible(false);
      form.reset();
    }
  });

  useEffect(() => {
    if (!isVisible) {
      form.reset();
    }
  }, [form, isVisible]);

  return { form, mutate };
}
