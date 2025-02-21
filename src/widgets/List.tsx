import { Todo } from '../entities/todoApi';
import { Item } from './ListItem';
import { Separator } from '../shared/ui';
import { useTodoList } from '../features';

export function List({ setCurrentTodo, setEditModalVisible }: { setCurrentTodo: (todo: Todo | null) => void; setEditModalVisible: (visible: boolean) => void }) {
  const { data, isLoading, error, updateTodo, deleteTodo, onEdit } = useTodoList({ setCurrentTodo, setEditModalVisible });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='h-[80%] overflow-y-scroll scrollbar-hide'>
      {data &&
        data.map((todo, index) => {
          return (
            <div key={index} className='my-4'>
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
