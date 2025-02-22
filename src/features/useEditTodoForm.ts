import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Todo, todoApi, todoSchema } from '../entities/todoApi';
import { toast } from 'sonner';

export function useEditTodoForm({ setIsVisible, currentTodo }: { setIsVisible: (isVisible: boolean) => void; currentTodo: Todo | null }) {
  const queryClient = useQueryClient();
  const form = useForm<Todo>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: '',
      dueDate: undefined,
      memo: '',
      priority: '0',
      isComplete: false
    }
  });

  const { mutate } = useMutation({
    mutationFn: (formData: Todo) => {
      return todoApi.updateTodo(formData);
    },
    onSuccess: () => {
      setIsVisible(false);
      form.reset();
      toast.success('할 일 수정 완료!');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: () => {
      toast.error('할 일 수정 실패 😭');
    }
  });

  useEffect(() => {
    if (currentTodo) {
      form.reset({ ...currentTodo });
    }
  }, [form, currentTodo]);

  return { form, mutate };
}
