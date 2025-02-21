import { useQuery } from '@tanstack/react-query';
import { todoApi, Todo } from '../entities/todoApi';
import { Item } from './Item';
import { Separator } from '../shared/ui';

export function List() {
  const { data, isLoading, error } = useList();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='h-full'>
      {data &&
        data.map((todo, index) => {
          return (
            <div key={index} className='my-4'>
              <Item todo={todo} />
              <Separator />
            </div>
          );
        })}
    </div>
  );
}

function useList() {
  const { data, isLoading, error } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: () => todoApi.getTodos()
  });

  return { data, isLoading, error };
}
