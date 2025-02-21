import { Trash2 } from 'lucide-react';

export function TodoDeleteButton({ onDelete }: { onDelete: () => void }) {
  return <Trash2 className='hidden group-hover:block absolute right-0' size={20} onClick={onDelete} />;
}
