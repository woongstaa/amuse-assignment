import { memo } from 'react';
import dayjs from 'dayjs';
import { Trash2 } from 'lucide-react';

import { Todo } from '@/entities/todoApi';
import { Checkbox } from '@/shared/ui/Checkbox';
import { CardTitle, CardDescription } from '@/shared/ui/Card';

function ItemComponent({
  todo,
  onCheck,
  onDelete,
  onEdit
}: //
{
  todo: Todo;
  onCheck: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
}) {
  const { title, dueDate, memo, isComplete, priority } = todo;

  return (
    <Container onEdit={onEdit} todo={todo}>
      <Checkbox
        checked={isComplete}
        onClick={(e) => {
          e.stopPropagation();
          onCheck(todo);
        }}
      />
      <div className='w-2' />
      <div className='sm:flex-1 min-w-0'>
        <Title title={title} priority={priority} isComplete={isComplete} />
        <Memo memo={memo} />
        <DueDate dueDate={dueDate} />
      </div>
      <DeleteButton onDelete={onDelete} todo={todo} />
    </Container>
  );
}

function Container({
  children, //
  onEdit,
  todo
}: {
  children: React.ReactNode;
  onEdit: (todo: Todo) => void;
  todo: Todo;
}) {
  return (
    <div className='p-4 flex group relative cursor-pointer' onClick={() => onEdit(todo)}>
      {children}
    </div>
  );
}

function Title({ title, priority, isComplete }: { title: Todo['title']; priority?: Todo['priority']; isComplete: Todo['isComplete'] }) {
  return (
    <CardTitle className={`truncate ${isComplete && 'text-muted-foreground'}`}>
      <span className={` text-red-500 ${priority !== '0' && 'mr-1'}`}>{priority ? '!'.repeat(Number(priority)) : null}</span>
      {title}
    </CardTitle>
  );
}

function Memo({ memo }: { memo: Todo['memo'] }) {
  return (
    <>
      <div className='h-1' />
      <CardDescription className='truncate'>{memo}</CardDescription>
    </>
  );
}

function DueDate({ dueDate }: { dueDate: Todo['dueDate'] }) {
  return (
    <>
      <div className='h-1' />
      <CardDescription className='truncate'>{dayjs(dueDate).format('YYYY. MM. DD')}</CardDescription>
    </>
  );
}

function DeleteButton({ onDelete, todo }: { onDelete: (todo: Todo) => void; todo: Todo }) {
  return (
    <Trash2
      className='block sm:hidden sm:group-hover:block absolute top-3 right-0 sm:hover:text-red-500'
      size={20}
      onClick={(e) => {
        e.stopPropagation();
        onDelete(todo);
      }}
    />
  );
}

export const Item = memo(ItemComponent);
