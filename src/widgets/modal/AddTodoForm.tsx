import { Container } from './Container';
import { TodoForm } from './TodoForm';
import { Button } from '../../shared/ui/Button';
import { useForm } from 'react-hook-form';
import { todoApi } from '../../entities/todoApi';
import { useMutation } from '@tanstack/react-query';
import { createTodoSchema } from '../../entities/todoApi';
import { useQueryClient } from '@tanstack/react-query';
import { CreateTodo } from '../../entities/todoApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

export function AddTodoForm({
  isVisible, //
  setIsVisible
}: {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { form, onSubmit } = useAddTodoForm({ isVisible, setIsVisible });

  return (
    <Container isVisible={isVisible} setIsVisible={setIsVisible}>
      <TodoForm //
        form={form}
        onSubmit={onSubmit}
        submitComponent={<SubmitComponent setIsVisible={setIsVisible} />}
      />
    </Container>
  );
}

function SubmitComponent({ setIsVisible }: { setIsVisible: (isVisible: boolean) => void }) {
  return (
    <>
      <div className='h-8' />
      <div className='flex justify-between gap-2'>
        <Button variant={'outline'} onClick={() => setIsVisible(false)}>
          취소
        </Button>
        <Button type='submit'>추가하기</Button>
      </div>
    </>
  );
}

function useAddTodoForm({ isVisible, setIsVisible }: { isVisible: boolean; setIsVisible: (isVisible: boolean) => void }) {
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

  const mutation = useMutation({
    mutationFn: (formData: CreateTodo) => todoApi.createTodo(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setIsVisible(false);
      form.reset();
    }
  });

  const onSubmit = (formData: CreateTodo) => {
    mutation.mutate(formData);
  };

  useEffect(() => {
    if (!isVisible) {
      form.reset();
    }
  }, [form, isVisible]);

  return { form, onSubmit };
}
