import { Container } from './Container';
import { TodoForm } from './TodoForm';
import { Button } from '../../shared/ui/Button';
import { useAddTodoForm } from '../../features';

export function AddTodoForm({
  isVisible, //
  setIsVisible
}: {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { form, mutate } = useAddTodoForm({ isVisible, setIsVisible });

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
        <Button type='submit'>추가하기</Button>
      </div>
    </>
  );
}
