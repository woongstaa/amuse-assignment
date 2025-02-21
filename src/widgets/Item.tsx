import { Todo } from '../entities/todoApi';
import { Card } from '../shared/ui/card';

export function Item({ todo }: { todo: Todo }) {
  const { id, createdAt, title, dueDate, memo } = todo;

  return (
    <Card className='p-4'>
      <p>{title}</p>
      <p>{dueDate}</p>
      <p>{memo}</p>
    </Card>
  );
}

function Complete() {}

function Prior() {}
