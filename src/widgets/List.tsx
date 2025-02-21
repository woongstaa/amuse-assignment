import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { todoApi, Todo } from '../entities/todoApi';
import { Item } from './Item';
import { Separator } from '../shared/ui';

export function List({ setCurrentTodo, setEditModalVisible }: { setCurrentTodo: (todo: Todo | null) => void; setEditModalVisible: (visible: boolean) => void }) {
  const { data, isLoading, error, updateTodo, deleteTodo, onEdit } = useList({ setCurrentTodo, setEditModalVisible });

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

function useList({ setCurrentTodo, setEditModalVisible }: { setCurrentTodo: (todo: Todo | null) => void; setEditModalVisible: (visible: boolean) => void }) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: () => todoApi.getTodos()
  });

  const { mutate: updateTodo } = useMutation({
    mutationFn: (todo: Todo) => todoApi.updateTodo({ ...todo, isComplete: !todo.isComplete }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  const { mutate: deleteTodo } = useMutation({
    mutationFn: (todo: Todo) => todoApi.deleteTodo(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  const onEdit = (todo: Todo) => {
    setCurrentTodo(todo);
    setEditModalVisible(true);
  };

  return { data, isLoading, error, updateTodo, deleteTodo, onEdit };
}
