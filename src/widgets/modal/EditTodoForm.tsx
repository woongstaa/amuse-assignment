import { Container } from './Container';
import { TodoForm } from './TodoForm';
import { Button } from '../../shared/ui/Button';
import { useForm } from 'react-hook-form';
import { Todo, todoApi, todoSchema } from '../../entities/todoApi';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

export function EditTodoForm({
  isVisible, //
  setIsVisible,
  currentTodo
}: {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  currentTodo: Todo | null;
}) {
  const { form, onSubmit } = useEditTodoForm({ setIsVisible, currentTodo });

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
        <Button type='submit'>수정하기</Button>
      </div>
    </>
  );
}

function useEditTodoForm({ setIsVisible, currentTodo }: { setIsVisible: (isVisible: boolean) => void; currentTodo: Todo | null }) {
  const queryClient = useQueryClient();
  const form = useForm<Todo>({
    resolver: zodResolver(todoSchema)
  });

  const mutation = useMutation({
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

  const onSubmit = (formData: Todo) => {
    mutation.mutate(formData);
  };

  useEffect(() => {
    if (currentTodo) {
      form.reset({ ...currentTodo });
    }
  }, [form, currentTodo]);

  return { form, onSubmit };
}
