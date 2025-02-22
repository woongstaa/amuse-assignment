import { Container } from './Container';
import { TodoForm } from '../../shared/component/TodoForm';
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
        setIsVisible={setIsVisible}
        type='add'
      />
    </Container>
  );
}
