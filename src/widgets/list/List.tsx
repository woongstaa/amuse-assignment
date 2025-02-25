import { Todo } from '@/entities/todoApi';
import { Separator } from '@/shared/ui/Separator';
import { useTodoList } from '@/features';
import { Item } from './ListItem';

export function List({
  todos, //
  setCurrentTodo,
  setEditModalVisible
}: {
  todos: Todo[];
  setCurrentTodo: (todo: Todo | null) => void;
  setEditModalVisible: (visible: boolean) => void;
}) {
  const { updateTodo, deleteTodo, onEdit } = useTodoList({ setCurrentTodo, setEditModalVisible });

  return (
    <div className='h-[80%] sm:h-[85%] overflow-y-scroll scrollbar-hide'>
      {todos.map((todo, index) => {
        return (
          <div key={index} className='mb-4'>
            <Item //
              todo={todo}
              onCheck={updateTodo}
              onDelete={deleteTodo}
              onEdit={onEdit}
            />
            <Separator />
          </div>
        );
      })}
    </div>
  );
}
