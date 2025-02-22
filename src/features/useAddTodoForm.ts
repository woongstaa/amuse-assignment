import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { todoApi, CreateTodo, createTodoSchema } from '@/entities/todoApi';
import { toast } from 'sonner';

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
      setIsVisible(false);
      form.reset();
      toast.success('할 일 추가 성공!');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: () => {
      toast.error('할 일 추가 실패 😭');
    }
  });

  useEffect(() => {
    if (!isVisible) {
      form.reset();
    }
  }, [form, isVisible]);

  return { form, mutate };
}
