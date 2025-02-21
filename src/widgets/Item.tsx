import dayjs from 'dayjs';
import { Todo } from '../entities/todoApi';
import { Checkbox } from '../shared/ui/Checkbox';
import { CardTitle, CardDescription } from '../shared/ui/Card';

export function Item({ todo, onClick }: { todo: Todo; onClick: (isComplete: boolean) => void }) {
  const { title, dueDate, memo, isComplete } = todo;

  return (
    <div className='p-4 flex'>
      <Checkbox checked={isComplete} onClick={() => onClick(!isComplete)} />
      <div className='w-4' />
      <div>
        {isComplete ? ( //
          <CardDescription>{title}</CardDescription>
        ) : (
          <CardTitle>{title}</CardTitle>
        )}
        {memo && (
          <>
            <div className='h-2' />
            <CardDescription>{memo}</CardDescription>
          </>
        )}
        {dueDate && (
          <>
            <div className='h-2' />
            <CardDescription>{dayjs(dueDate).format('YYYY. MM. DD')}</CardDescription>
          </>
        )}
      </div>
    </div>
  );
}
