import dayjs from 'dayjs';
import { Todo } from '../entities/todoApi';
import { Checkbox } from '../shared/ui/Checkbox';
import { CardTitle, CardDescription } from '../shared/ui/Card';
import { Trash2 } from 'lucide-react';

export function Item({
  todo,
  onCheck,
  onDelete
}: //
{
  todo: Todo;
  onCheck: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}) {
  const { title, dueDate, memo, isComplete, priority } = todo;

  return (
    <div className='p-4 flex group relative'>
      <Checkbox checked={isComplete} onClick={() => onCheck(todo)} />
      <div className='w-2' />
      <div className='max-w-[460px]'>
        <div className='flex'>
          <CardTitle className={`truncate ${isComplete && 'text-muted-foreground'}`}>
            <span className={` text-red-500 ${priority !== '0' && 'mr-1'}`}>{priority ? '!'.repeat(Number(priority)) : null}</span>
            {title}
          </CardTitle>
        </div>
        {memo && (
          <>
            <div className='h-1' />
            <CardDescription className='truncate'>{memo}</CardDescription>
          </>
        )}
        {dueDate && (
          <>
            <div className='h-1' />
            <CardDescription className='truncate'>{dayjs(dueDate).format('YYYY. MM. DD')}</CardDescription>
          </>
        )}
      </div>
      <Trash2 //
        className='hidden group-hover:block absolute top-3 right-0 hover:text-red-500'
        size={20}
        onClick={() => onDelete(todo)}
      />
    </div>
  );
}
