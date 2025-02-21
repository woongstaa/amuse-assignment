import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { todoApi, Todo } from '../entities/todoApi';
import { Item } from './Item';
import { Separator } from '../shared/ui';

export function List() {
  const { data, isLoading, error, updateTodo, deleteTodo } = useList();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='h-[80%] overflow-y-scroll scrollbar-hide'>
      {data &&
        data.map((todo, index) => {
          return (
            <div key={index} className='my-4'>
              <Item todo={todo} onCheck={updateTodo} onDelete={deleteTodo} />
              <Separator />
            </div>
          );
        })}
    </div>
  );
}

function useList() {
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

  return { data, isLoading, error, updateTodo, deleteTodo };
}
