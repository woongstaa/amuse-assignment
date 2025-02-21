import { Container } from './Container';
import { TodoForm } from './TodoForm';
import { Button } from '../../shared/ui/Button';
import { Todo } from '../../entities/todoApi';

import { useEditTodoForm } from '../../features/useEditTodoForm';

export function EditTodoForm({
  isVisible, //
  setIsVisible,
  currentTodo
}: {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  currentTodo: Todo | null;
}) {
  const { form, mutate } = useEditTodoForm({ setIsVisible, currentTodo });

  return (
    <Container isVisible={isVisible} setIsVisible={setIsVisible}>
      <TodoForm //
        form={form}
        onSubmit={mutate}
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
