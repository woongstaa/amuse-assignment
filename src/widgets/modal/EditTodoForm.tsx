import { Container } from './Container';
import { TodoForm } from '../../shared/component/TodoForm';
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
        setIsVisible={setIsVisible}
        type='edit'
      />
    </Container>
  );
}
