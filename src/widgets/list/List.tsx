import { Todo } from '@/entities/todoApi';
import { Separator } from '@/shared/ui/Separator';
import { useTodoList } from '@/features';
import { Item } from './ListItem';
import { AsyncBoundary } from '@/shared/component/AsyncBoundary';
import { Skeleton } from '@/shared/ui';

export function List({ setCurrentTodo, setEditModalVisible }: { setCurrentTodo: (todo: Todo | null) => void; setEditModalVisible: (visible: boolean) => void }) {
  const { data, isLoading, error, updateTodo, deleteTodo, onEdit } = useTodoList({ setCurrentTodo, setEditModalVisible });

  return (
    <AsyncBoundary //
      isLoading={isLoading}
      error={error}
      loadingComponent={<TodoSkeleton />}
    >
      <div className='h-[80%] sm:h-[85%] overflow-y-scroll scrollbar-hide'>
        {data &&
          data.map((todo, index) => {
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
    </AsyncBoundary>
  );
}

function TodoSkeleton() {
  return (
    <>
      <div className='flex p-4 w-full'>
        <Skeleton className='w-4 h-4' />
        <div className='w-2' />
        <div className='flex-1'>
          <Skeleton className='w-4/6 h-4' />
          <div className='h-1' />
          <Skeleton className='w-2/6 h-4' />
        </div>
      </div>
      <Separator />
    </>
  );
}
