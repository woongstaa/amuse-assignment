import { List } from '../widgets/list';
import { useTodos } from '../features/useTodos';
import { Top } from '../widgets/top';
import { Bottom } from '../widgets/bottom';
import { EditTodoForm, AddTodoForm } from '../widgets/modal';
import { useSearchParams } from 'react-router';
import { SuspenseQuery } from '@suspensive/react-query';
import { Suspense } from '@suspensive/react';
import { todoQueryOptions } from '@/features/queries';
import { Separator } from '@/shared/ui/Separator';
import { Skeleton } from '@/shared/ui';

export function Todos() {
  const { addModalVisible, editModalVisible, setAddModalVisible, setEditModalVisible, currentTodo, setCurrentTodo } = useTodos();

  const [searchParams] = useSearchParams();

  const q = searchParams.get('q');
  const isComplete = searchParams.get('isComplete');
  const priority = searchParams.get('priority');

  return (
    <main className='w-[100dvw] h-[100dvh] flex flex-col items-center'>
      <div className='w-[100dvw] max-w-[560px] h-full flex flex-col p-4'>
        <Top />
        <Suspense fallback={<TodoSkeleton />}>
          <SuspenseQuery {...todoQueryOptions(q, isComplete, priority)}>
            {({ data: todos }) => (
              <List //
                todos={todos}
                setCurrentTodo={setCurrentTodo}
                setEditModalVisible={setEditModalVisible}
              />
            )}
          </SuspenseQuery>
        </Suspense>
        <Bottom setAddModalVisible={setAddModalVisible} />
      </div>
      <AddTodoForm isVisible={addModalVisible} setIsVisible={setAddModalVisible} />
      <EditTodoForm isVisible={editModalVisible} setIsVisible={setEditModalVisible} currentTodo={currentTodo} />
    </main>
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
